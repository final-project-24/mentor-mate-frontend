// DashboardSidebar.jsx
import { Link } from "react-router-dom";
import "./DashboardSidebar.css";

export default function DashboardSidebar() {
  return (
    <div className="dashboard-sidebar">
      <ul>
        <li>
          <Link to="/dashboard/admin-tools">Admin Tools</Link>
        </li>
        <li>
          <Link to="/dashboard/settings">Settings</Link>
        </li>
        <li>
          <Link to="/dashboard/schedule">Schedule</Link>
        </li>
        <li>
          <Link to="/dashboard/session">Session</Link>
        </li>
        <li>
          <Link to="/dashboard/feedback">Feedback</Link>
        </li>
      </ul>
    </div>
  );
}
