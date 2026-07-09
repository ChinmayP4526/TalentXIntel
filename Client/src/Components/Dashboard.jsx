import React from "react";
import NavbarDashboard from "./NavbarDashboard";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <NavbarDashboard />

      <div className="dashboard-content mt-5 pt-4">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;