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
// 👇 import your password settings page
import PasswordSettings from "./components/deafultPasswordChanger";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // ✅ Decide redirect path
  const getDashboardPath = (user) => {
    // 🚨 force password update if default password is still used
    if (user?.password === "1234") {
      return "/password-settings";
    }

    // otherwise, send to dashboard by role
    switch (user?.role) {
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
            {/* Root → Login or Redirect */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to={getDashboardPath(user)} replace />
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

            {/* ✅ Password Settings Page */}
            <Route
              path="/password-settings"
              element={
                <ProtectedRoute>
                  <PasswordSettings />
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
