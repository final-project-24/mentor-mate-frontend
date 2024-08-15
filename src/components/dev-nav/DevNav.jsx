// DevNav.jsx

import "./DevNav.css";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx"; //
import LogoutButton from "../logout/Logout.jsx";

export default function DevNav() {
  const { isLoggedIn } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn state

  return (
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
          <Link to="/booking-details">Booking Details</Link>
        </li>
        <li>
          <Link to="/session">Session</Link>
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
  );
}
