import React from "react";
import "./Settings.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import Layout from "../../components/layout/Layout";
import DeleteUser from "../../components/delete-user/DeleteUser.jsx";
import ResetPassword from "../../components/reset-password/ResetPassword.jsx";
import ChangeRole from "../../components/change-role/ChangeRole.jsx";

export default function Settings() {
  const { isLoggedIn, user } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn and user state

  return (
    <Layout>
      <section id="settings">
        <p>
          Settings: Maybe we can add some settings related to the user profile
          here. eg - change password, change email, change username, etc.
        </p>
        {isLoggedIn && (
          <>
            {(user.role === "admin" || user.originalRole === "admin") && (
              <ChangeRole user={user} />
            )}
            <DeleteUser />
          </>
        )}
        {/* <ResetPassword /> */}
      </section>
    </Layout>
  );
}
