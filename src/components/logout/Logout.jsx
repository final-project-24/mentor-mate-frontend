import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import "./Logout.css";

const LogoutButton = () => {
  const { logout } = useAuthContext(); // Use useAuthContext hook to access logout method

  const handleLogout = async () => {
    try {
      await logout(); // Use logout method from authentication context
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
