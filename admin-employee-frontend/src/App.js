import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Dashboard/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "./pages/Dashboard/EmployeeDashboard/EmployeeDashboard";
import SuperAdminDashboard from "./pages/Dashboard/SuperAdminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // ✅ Decide redirect path based on role
  const getDashboardPath = (role) => {
    switch (role) {
      case "superadmin":
        return "/superadmin/dashboard";
      case "admin":
        return "/admin/dashboard";
      case "employee":
        return "/employee/dashboard";
      default:
        return "/";
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Root → Login */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to={getDashboardPath(user.role)} replace />
                ) : (
                  <Login />
                )
              }
            />

            {/* Super Admin */}
            <Route
              path="/superadmin/dashboard"
              element={
                <ProtectedRoute requiredRole="superadmin">
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Employee */}
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute requiredRole="employee">
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />

            {/* Optional: Redirect /login → / */}
            <Route path="/login" element={<Navigate to="/" replace />} />

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
