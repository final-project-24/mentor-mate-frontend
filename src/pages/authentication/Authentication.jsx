import { useState } from "react";
import Layout from "../../components/layout/Layout.jsx";
import Login from "../../components/login/Login.jsx";
import SignUp from "../../components/signup/Signup.jsx";
import ForgotPassword from "../../components/forgot-password/ForgotPassword.jsx";
import ResetPassword from "../../components/reset-password/ResetPassword.jsx";
import ToggleButton from "../../components/toggle-button/ToggleButton.jsx";
import "./Authentication.css";

const Authentication = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetToken, setResetToken] = useState(null);

  const handleToggleSignUpLogin = () => {
    setShowSignUp(!showSignUp);
  };

  const handleToggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const handleResetPassword = (token) => {
    setResetToken(token);
    setShowForgotPassword(false);
  };

  return (
    <Layout>
      <section id="authentication" className="my-5">
        {showForgotPassword && !resetToken && (
          <ForgotPassword onResetRequest={handleResetPassword} />
        )}
        {resetToken && <ResetPassword token={resetToken} />}
        {!showForgotPassword && !resetToken && (
          <div>
            {showSignUp ? (
              <SignUp onToggleLogin={handleToggleSignUpLogin} />
            ) : (
              <Login
                onToggleSignUp={handleToggleSignUpLogin}
                onToggleForgotPassword={handleToggleForgotPassword}
              />
            )}
            {/* <div className="button-container">
              <ToggleButton
                onToggle={handleToggleSignUpLogin}
                buttonName={
                  showSignUp ? "Switch to Login" : "Switch to Sign Up"
                }
                className="button-type-basic"
              />
              <ToggleButton
                onToggle={handleToggleForgotPassword}
                buttonName="Forgot Password"
                className="button-type-basic"
              />
            </div> */}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Authentication;
