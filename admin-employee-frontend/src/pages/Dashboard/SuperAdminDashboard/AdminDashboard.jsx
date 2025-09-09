import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import ThemeContext from "../../../context/ThemeContext";
import PasswordSettings from "../../../components/PasswordSettings";
import Dashboard from "./Dashboard";
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
    <div className={`min-h-screen flex ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
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