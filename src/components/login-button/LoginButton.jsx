import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

const LoginButton = () => {
  const { login } = useAuthContext(); // Access the login method
  const navigate = useNavigate(); // Use React Router's navigate function

  const handleLogin = async () => {
    try {
      await login(); // Call login method from the context
      navigate("/authentication"); // Navigate to the authentication page after login
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-button-container">
      <button onClick={handleLogin} className="items-center justify-end">Login</button>
    </div>
  );
};

export default LoginButton;
