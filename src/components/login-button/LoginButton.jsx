// import React from "react";
import { Link } from "react-router-dom";
import "./LoginButton.css";

const LoginButton = () => {
  return (
    <div className="login-button-container">
      <Link to="/authentication">Login</Link>
    </div>
  );
};

export default LoginButton;
