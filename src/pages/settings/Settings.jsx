import "./Settings.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import Layout from "../../components/layout/Layout";
import DeleteUser from "../../components/delete-user/DeleteUser.jsx";
import ResetPassword from "../../components/reset-password/ResetPassword.jsx";

export default function Settings() {
  const { isLoggedIn } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn state

  return (
    <Layout>
      <section id="settings" className="pt-[100px]">
        <p>
          Settings: Maybe we can add some settings related to the user profile
          here. eg - change password, change email, change username, etc.
        </p>
        {/* {isLoggedIn && <ResetPassword />} */}
        {isLoggedIn && <DeleteUser />}
      </section>
    </Layout>
  );
}
