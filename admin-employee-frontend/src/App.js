import React, { useEffect } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
// 👇 import your password settings page
import PasswordSettings from "./components/deafultPasswordChanger";
import { getDashboardPath } from "./utils/redirect";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import SuperAdminDashboard from "./pages/Dashboard/SuperAdminDashboard/SuperAdminDashboard ";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <div className="App">
          <Routes>
            {/* Root → Login or Redirect */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to={getDashboardPath(user) || "/"} replace />
                ) : (
                  <Login />
                )
              }
            />

            {/* Super Admin */}
            <Route
              path="/superadmin/dashboard"
              element={
                <ProtectedRoute requiredRole="Super Admin">
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="Department Admin">
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
