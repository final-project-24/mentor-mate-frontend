import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import "./AdminTools.css";
import ChangeRole from "../../components/change-role/ChangeRole";

export default function AdminTools() {
  const { isLoggedIn, user } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn and user state
  return (
    <section id="admin-tools">
      <h1>Admin Tools</h1>
    
      {isLoggedIn &&
        (user.role === "admin" || user.originalRole === "admin") && (
          <ChangeRole user={user} />
        )}
    </section>
  );
}
