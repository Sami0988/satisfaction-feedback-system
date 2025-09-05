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
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          {isAuthenticated }
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate
                    to={
                      user.role === "admin"
                        ? "/admin/dashboard"
                        : "/employee/dashboard"
                    }
                    replace
                  />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute requiredRole="employee">
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    isAuthenticated
                      ? user.role === "admin"
                        ? "/admin/dashboard"
                        : "/employee/dashboard"
                      : "/login"
                  }
                  replace
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
