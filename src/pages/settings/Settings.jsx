// import React from "react";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import "./Settings.css";
import Loading from "../../components/loading/Loading";
// import Layout from "../../components/layout/Layout";
import ChangeUserName from "../../components/change-user-name/ChangeUserName.jsx";
import ChangePassword from "../../components/change-password/ChangePassword.jsx";
import ChangeEmail from "../../components/change-email/ChangeEmail.jsx";
import DeleteUser from "../../components/delete-user/DeleteUser.jsx";
import { changeEmail } from "../../utils/api-connector.js";
// import ResetPassword from "../../components/reset-password/ResetPassword.jsx";

export default function Settings() {
  const { loading, isLoggedIn } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn and user state

  if (loading) {
    return <Loading />;
  } // or any other loading indicator

  return (
    <section id="settings-container">
      
      <div className="settings">
        {isLoggedIn && (
          <>
            <h1>Settings</h1>
            <ChangeUserName />
            <ChangePassword />
            <ChangeEmail />
            <DeleteUser />
          </>
        )}
        {/* <ResetPassword /> */}
      </div>
    </section>
  );
}
