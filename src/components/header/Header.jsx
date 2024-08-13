import "./Header.css";
import { Link } from "react-router-dom";
import LogoutButton from "../logout/Logout.jsx";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx"; //

export default function Header() {
  const { isLoggedIn } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn state

  return (
    <>
      <header id="header">
        <div className="development-navigation">
          <p>dev nav:</p>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/match-making">Match Making</Link>
            </li>
            <li>
              <Link to="/schedule">Schedule</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
            <li>
              <Link to="/playground">Playground</Link>
            </li>
          </ul>

          <ul>
            {!isLoggedIn && (
              <li>
                <Link to="/authentication">Login</Link>{" "}
              </li>
            )}
          </ul>

          {isLoggedIn && <LogoutButton />}
        </div>
        <p>Header: part of layout component</p>
      </header>
    </>
  );
}
