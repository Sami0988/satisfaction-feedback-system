import React, { useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";

const Reports = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`p-6 rounded-lg shadow ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        Reports & Analytics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Employee Performance
          </h3>
          <div className={`h-40 flex items-center justify-center border border-dashed rounded ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              Performance chart would be displayed here
            </p>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Service Utilization
          </h3>
          <div className={`h-40 flex items-center justify-center border border-dashed rounded ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              Utilization chart would be displayed here
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Revenue Analysis
          </h3>
          <div className={`h-40 flex items-center justify-center border border-dashed rounded ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              Revenue chart would be displayed here
            </p>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            User Engagement
          </h3>
          <div className={`h-40 flex items-center justify-center border border-dashed rounded ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              Engagement chart would be displayed here
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          Generate Employee Report
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          Generate Service Report
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          Export All Data
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          Schedule Report
        </button>
      </div>
    </div>
  );
};

export default Reports;