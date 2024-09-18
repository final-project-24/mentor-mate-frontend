import classNames from "classnames";
import { isMobile } from "react-device-detect";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import "./AdminTools.css";
// import ChangeRole from "../../components/change-role/ChangeRole";

export default function AdminTools() {
  const { isLoggedIn, user } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn and user state
  
  const linkClass = classNames('min-w-[200px] p-3 bg-accent text-primary text-center rounded-md transition', {
    'hover:bg-[#2ecc71]': !isMobile
  })
  
  return (
      <section
        className="w-full flex flex-col px-3 mt-[110px] md:mt-[150px] gap-10 items-center"
        // id="admin-dashboard-container"
      >
        <h1 className="text-center text-xl">Admin Dashboard</h1>
        <>
          {isLoggedIn &&
            (user.role === "admin" || user.originalRole === "admin") && (
              <div className="w-full md:w-[80%] xl:w-[50%] flex flex-col items-center gap-3 bg-card p-3 border-2 rounded-lg">
                <Link
                  className={linkClass}
                  to="/dashboard/admin-tools/skill-categories"
                >
                  Manage Skill Categories
                </Link>
                <Link
                  className={linkClass}
                  to="/dashboard/admin-tools/admin-skills"
                >
                  Manage Skills
                </Link>
              </div>
            )}
        </>
        <Outlet />
        {/* <ChangeRole user={user} /> */}
      </section>
  );
}
