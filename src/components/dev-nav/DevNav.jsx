// DevNav.jsx

// import React from "react";
import { Link } from "react-router-dom";
// import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import "./DevNav.css";

export default function DevNav() {
  // const { isLoggedIn } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn state

  return (
    <div className="dev-nav-container">
      <ul>
        <li>dev nav:</li>
        <li>
          <Link to="/playground">Playground</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/schedule">Schedule</Link>
        </li>
        <li>
          <Link to="/booking/:id">Booking</Link>
        </li>
        <li>
          <Link to="/payment">Payment</Link>
        </li>
        <li>
          <Link to="/session">Session</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        <li>
          <Link to="/terms">Terms</Link>
        </li>
      </ul>
    </div>
  );
}
