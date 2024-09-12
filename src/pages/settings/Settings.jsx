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
    <section id="settings-container" className="mt-[100px]  lg:mb-[100px] ">
      <h1 className="text-accent">Settings</h1>
      <div className="settings-card md:w-[80%] lg:w-[60%] xl:w-[40%] lg ">
        <h1 className="">Preferences</h1>
        <div className="md:w-[60%] xl:w-[50%]  ">
          <ChangeAppearance />
          <LanguageButton />
        </div>
      </div>

      <div className="settings-card md:w-[80%] lg:w-[60%] xl:w-[40%]">
        {isLoggedIn && (
          <>
            <h1>Account</h1>
            <div className="md:w-[60%] xl:w-[50%]">
              <ChangeUserName />
              <ChangePassword />
              <ChangeEmail />
              <DeleteUser />
            </div>
          </>
        )}
        {/* <ResetPassword /> */}
      </div>
    </section>
  );
}
