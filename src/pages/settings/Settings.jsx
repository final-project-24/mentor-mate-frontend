// import React from "react";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import "./Settings.css";
import Loading from "../../components/loading/Loading";
// import Layout from "../../components/layout/Layout";
import ChangeAppearance from "../../components/change-appearance/ChangeAppearance.jsx";
import LanguageButton from "../../components/change-language/ChangeLanguage.jsx";
import ChangeUserName from "../../components/change-user-name/ChangeUserName.jsx";
import ChangePassword from "../../components/change-password/ChangePassword.jsx";
import ChangeEmail from "../../components/change-email/ChangeEmail.jsx";
import DeleteUser from "../../components/delete-user/DeleteUser.jsx";
// import ResetPassword from "../../components/reset-password/ResetPassword.jsx";

export default function Settings() {
  const { loading, isLoggedIn } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn and user state

  if (loading) {
    return <Loading />;
  } // or any other loading indicator

  return (
    <section id="settings-container">
      <div className="settings-card">
        <h1>App Settings</h1>
        <ChangeAppearance />
        <LanguageButton />
      </div>

      <div className="settings-card">
        {isLoggedIn && (
          <>
            <h1>Account Settings</h1>
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
