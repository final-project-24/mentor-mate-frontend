import { useState } from "react";
import "./Login.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx"; //
import { useNavigate } from "react-router-dom"; //
import ToggleButton from "../../components/toggle-button/ToggleButton.jsx";

// function Login({ onLogin }) {
function Login({ onToggleSignUp, onToggleForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuthContext(); // Use useAuthContext hook to access login method

  const navigate = useNavigate(); //

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      setEmail("");
      setPassword("");
      navigate("/dashboard"); //
      window.scrollTo(0, 0); // Scroll to the top of the page
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (


    <div className="login-container px-2 min-h-10 mt-[100px]  border border-red-600">
      <h2 className="text-accent text-lg pb-4">Login</h2>
      {errorMessage && <p className="login-error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="">Login</button>
      </form>
      <ToggleButton
        onToggle={onToggleSignUp}
        buttonName="Switch to Sign Up"
        className="button-type-link "
      />
      <ToggleButton
        onToggle={onToggleForgotPassword}
        buttonName="Forgot Password"
        className="button-type-link"
      />

    </div>
  );
}

export default Login;
