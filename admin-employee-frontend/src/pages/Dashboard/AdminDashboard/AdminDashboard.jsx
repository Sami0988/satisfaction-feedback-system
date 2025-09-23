import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import RecentActivity from "./RecentActivity";
import StatsGrid from "./StatsGrid";
import EmployeeManagement from "./EmployeeManagement";
import ServicesManagement from "./ServicesManagement";
import Reports from "./Reports";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import ThemeContext from "../../../context/ThemeContext";
import PasswordSettings from "../../../components/PasswordSettings";
import Feedback from "../../../components/Feedback";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <StatsGrid />
            <RecentActivity />
          </>
        );
      case "employees":
        return <EmployeeManagement />;
      case "services":
        return <ServicesManagement />;
      case "reports":
        return <Reports />;
      case "settings":
        return <PasswordSettings />;
      case "feedback":
        return <Feedback />;
      default:
        return (
          <>
            <StatsGrid />
            <RecentActivity />
          </>
        );
    }
  };

  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          user={user}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto text-sm">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
