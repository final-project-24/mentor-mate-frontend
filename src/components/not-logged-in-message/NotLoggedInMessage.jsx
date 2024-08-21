import React from "react";
import LoginButton from "../login-button/LoginButton";

const NotLoggedInMessage = () => {
  return (
    <div className="not-logged-in-container">
      <>Please log in to view this page.</>
      <br />
      <br />
      <LoginButton />
    </div>
  );
};

export default NotLoggedInMessage;
