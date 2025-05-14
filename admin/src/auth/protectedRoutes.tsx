import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {
  isAuthenticated: boolean; // Pass this prop to indicate if the user is authenticated
  redirectPath?: string; // Optional: Path to redirect if not authenticated
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  isAuthenticated,
  redirectPath = "/", // Default redirect path
}) => {
  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to={redirectPath} replace />;
  }

  // Render the protected content if authenticated
  return <Outlet />;
};

export default ProtectedRoutes;
