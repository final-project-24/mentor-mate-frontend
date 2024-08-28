import { useState } from "react";
import "./Login.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import { useNavigate } from "react-router-dom";
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
      await login(email, password); // Use login method from authentication context

      setEmail("");
      setPassword("");
      navigate("/"); //
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (

    <div className="login-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <ToggleButton
        onToggle={onToggleSignUp}
        buttonName="Switch to Sign Up"
        className="button-type-link"
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
