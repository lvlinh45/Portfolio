import React from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const AdminPortal = () => {
  const { isAuthenticated } = usePortfolioData();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
};

export default AdminPortal;
