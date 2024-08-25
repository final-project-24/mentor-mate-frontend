// import React from "react";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import "./Settings.css";
import Loading from "../../components/loading/Loading";
// import Layout from "../../components/layout/Layout";
import ChangePassword from "../../components/change-password/ChangePassword.jsx";
import DeleteUser from "../../components/delete-user/DeleteUser.jsx";
// import ResetPassword from "../../components/reset-password/ResetPassword.jsx";
// import ChangeRole from "../../components/change-role/ChangeRole.jsx";

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
            <ChangePassword />
            <DeleteUser />
          </>
        )}
        {/* <ResetPassword /> */}
      </div>
    </section>
  );
}
