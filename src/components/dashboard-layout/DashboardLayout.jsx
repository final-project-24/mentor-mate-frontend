// DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";
import Layout from "../layout/Layout";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <Layout>
      <div className="dashboard-layout">
        <div className="dashboard-sidebar">
          <DashboardSidebar />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
