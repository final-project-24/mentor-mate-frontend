// DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";
import Layout from "../layout/Layout";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <Layout>
      <div className="dashboard-layout">
        <DashboardSidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
