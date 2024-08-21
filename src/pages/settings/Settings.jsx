import React from "react";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import "./Settings.css";
import Loading from "../../components/loading/Loading";
import Layout from "../../components/layout/Layout";
import DeleteUser from "../../components/delete-user/DeleteUser.jsx";
import ResetPassword from "../../components/reset-password/ResetPassword.jsx";
import ChangeRole from "../../components/change-role/ChangeRole.jsx";

export default function Settings() {
  const { loading, isLoggedIn, user } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn and user state

  if (loading) {
    return <Loading />;
  } // or any other loading indicator

  return (
    <Layout>
      <section id="settings" className="pt-[100px]">
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
