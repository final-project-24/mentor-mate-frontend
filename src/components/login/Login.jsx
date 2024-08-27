import { useState } from "react";
import "./Login.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx"; 
import { useNavigate } from "react-router-dom"; //

// function Login({ onLogin }) {
function Login({ onToggleSignUp, onToggleForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuthContext(); 

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); 

      setEmail("");
      setPassword("");
      navigate("/"); 
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="pt-[80px] lg:pt-[100px]">
      <div className="container">
        <div className="form-container">
          <h2>Login</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        </div>
      </div>
    </div>
);

    </div>
  );
}

export default Login;
