import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import "./Logout.css";

const LogoutButton = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const { logout } = useAuthContext(); // Use useAuthContext hook to access logout method
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Use logout method from authentication context
      setFeedbackMessage("Logged out successfully!");
      navigate("/");
    } catch (error) {
      setFeedbackMessage(`An error occurred during logout: ${error.message}`);
    }
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout}>Logout</button>
      {feedbackMessage && <p>{feedbackMessage}</p>}
    </div>
  );
};

export default LogoutButton;
