// import React from "react";
// import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import "./DashboardHome.css";
import LoginButton from "../login-button/LoginButton";

export default function DashboardHome() {
  const { isLoggedIn } = useAuthContext();
  return (
    <div id="dashboard-home-container">
      {isLoggedIn ? (
        <>
          <h1>Welcome to the Dashboard</h1>
          <p>This is the starting page of the dashboard.</p>
        </>
      ) : (
        <div className="login-message-container">
          <p>Please log in to access the dashboard.</p>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
