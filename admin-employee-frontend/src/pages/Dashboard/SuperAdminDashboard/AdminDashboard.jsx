import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import ThemeContext from "../../../context/ThemeContext";
import PasswordSettings from "../../../components/PasswordSettings";
import EmployeeManagement from "./EmployeeManagement";
import ServiceManagement from "./ServiceManagement";
import Reports from "./Reports";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const user = useSelector((state) => state.auth.user);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Mock data for dashboard metrics
  const dashboardData = {
    departments: 8,
    activeDepartments: 6,
    admins: 3,
    employees: 47,
    recentActivity: [
      {
        id: 1,
        action: "New employee added",
        department: "HR",
        time: "2 hours ago",
      },
      {
        id: 2,
        action: "Service updated",
        department: "IT",
        time: "5 hours ago",
      },
      {
        id: 3,
        action: "Report generated",
        department: "Finance",
        time: "Yesterday",
      },
      {
        id: 4,
        action: "Password changed",
        department: "Admin",
        time: "Yesterday",
      },
    ],
  };

  const Dashboard = () => {
    return (
      <div className={`p-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Departments Card */}
          <div
            className={`rounded-lg p-6 shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Departments
                </h2>
                <p className="text-2xl font-bold">
                  {dashboardData.departments}
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {dashboardData.activeDepartments} active
                </p>
              </div>
            </div>
          </div>

          {/* Admins Card */}
          <div
            className={`rounded-lg p-6 shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-green-100 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Admins
                </h2>
                <p className="text-2xl font-bold">{dashboardData.admins}</p>
              </div>
            </div>
          </div>

          {/* Employees Card */}
          <div
            className={`rounded-lg p-6 shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-purple-100 text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Employees
                </h2>
                <p className="text-2xl font-bold">{dashboardData.employees}</p>
              </div>
            </div>
          </div>

          {/* Active Status Card */}
          <div
            className={`rounded-lg p-6 shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-yellow-100 text-yellow-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  System Status
                </h2>
                <p className="text-xl font-bold text-green-600">
                  All Systems Operational
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div
          className={`rounded-lg shadow-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-6`}
        >
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                <tr>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isDarkMode
                    ? "divide-gray-700 bg-gray-800"
                    : "divide-gray-200 bg-white"
                }`}
              >
                {dashboardData.recentActivity.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">
                        {activity.action}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{activity.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {activity.time}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "employees":
        return <EmployeeManagement />;
      case "services":
        return <ServiceManagement />;
      case "reports":
        return <Reports />;
      case "settings":
        return <PasswordSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col">
        <Header
          user={user}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
