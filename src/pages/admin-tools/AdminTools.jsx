import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import "./AdminTools.css";
import ChangeRole from "../../components/change-role/ChangeRole";
import SkillCategory from "../../components/skills/skill-category/SkillCategory";

export default function AdminTools() {
  const { isLoggedIn, user } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn and user state
  return (
    <section id="admin-dashboard-container">
      {/* <h1>Admin Dashboard</h1> */}
    
      {isLoggedIn &&
        (user.role === "admin" || user.originalRole === "admin") && (
          <>
            <ChangeRole user={user} />
            <SkillCategory />
          </>
        )}
    </section>
  );
}
