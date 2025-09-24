import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import ThemeContext from "../../../context/ThemeContext";
import PasswordSettings from "../../../components/PasswordSettings";
import Dashboard from "./Dashboard";
import Feedback from "./Feedback";
import ServiceRequest from "./ServiceRequest";
import Reports from "./Reports";

const EmployeeDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const user = useSelector((state) => state.auth.user);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "feedback":
        return <Feedback />;
      case "service-request":
        return <ServiceRequest />;
      case "reports":
        return <Reports />;
      case "settings":
        return <PasswordSettings />;
      default:
        return <div className="p-4 text-gray-700">Section not found</div>;
    }
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col">
        <Header user={user} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-auto">{renderSection()}</main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
