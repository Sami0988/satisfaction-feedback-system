import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute component that checks authentication and user role
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The child components to render if authenticated
 * @param {string} [props.requiredRole] - Optional role required to access the route
 * @returns {ReactNode} Either the children components or a redirect to login
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If role is required but user doesn't have it, redirect to appropriate dashboard
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect based on actual user role
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/employee/dashboard"}
        replace
      />
    );
  }

  // If authenticated and has required role (if any), render children
  return children;
};

export default ProtectedRoute;
