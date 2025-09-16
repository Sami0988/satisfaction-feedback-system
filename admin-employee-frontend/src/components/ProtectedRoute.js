import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute ensures the user is authenticated and optionally has a required role.
 *
 * @param {ReactNode} children - Components to render if allowed
 * @param {string} [requiredRole] - Optional role required to access this route
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Not authenticated → redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role check: if requiredRole is set and user doesn't match → redirect to their dashboard
  if (requiredRole && user.role !== requiredRole) {
    let redirectPath = "/employee/dashboard"; // default

    if (user.role === "Super Admin") redirectPath = "/superadmin/dashboard";
    else if (user.role === "Admin") redirectPath = "/admin/dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  // Authenticated & authorized → render children
  return children;
};

export default ProtectedRoute;
