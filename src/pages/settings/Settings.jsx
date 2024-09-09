// import React from "react";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import "./Settings.css";
import Loading from "../../components/loading/Loading";
import NotLoggedInMessage from "../../components/not-logged-in-message/NotLoggedInMessage";
// import Layout from "../../components/layout/Layout";
import ChangeAppearance from "../../components/change-appearance/ChangeAppearance.jsx";
import LanguageButton from "../../components/change-language/ChangeLanguage.jsx";
import ChangeUserName from "../../components/change-user-name/ChangeUserName.jsx";
import ChangePassword from "../../components/change-password/ChangePassword.jsx";
import ChangeEmail from "../../components/change-email/ChangeEmail.jsx";
import DeleteUser from "../../components/delete-user/DeleteUser.jsx";
// import ResetPassword from "../../components/reset-password/ResetPassword.jsx";

export default function Settings() {
  const { user, loading, isLoggedIn } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn and user state

  // If the page is still loading, display a loading indicator
  if (loading) {
    return <Loading />;
  }

  // If the user is not logged in, display a message to prompt them to log in
  if (!user) {
    return <NotLoggedInMessage />;
  }

  return (
    <section id="settings-container">
      <h1>Settings</h1>
      <div className="settings-card">
        <h1>Preferences</h1>
        <ChangeAppearance />
        <LanguageButton />
      </div>

      <div className="settings-card">
        {isLoggedIn && (
          <>
            <h1>Account</h1>
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
