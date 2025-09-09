import React, { useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";

const ServiceManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);

  // Demo data for services
  const services = [
    {
      id: 1,
      name: "Web Development",
      category: "IT",
      status: "Active",
      employees: 5,
      description: "Custom website and web application development"
    },
    {
      id: 2,
      name: "Graphic Design",
      category: "Creative",
      status: "Active",
      employees: 3,
      description: "Logo design, branding, and marketing materials"
    },
    {
      id: 3,
      name: "Content Writing",
      category: "Marketing",
      status: "Pending",
      employees: 2,
      description: "Blog posts, articles, and website content"
    },
    {
      id: 4,
      name: "SEO Optimization",
      category: "Marketing",
      status: "Active",
      employees: 4,
      description: "Search engine optimization and analytics"
    },
    {
      id: 5,
      name: "Mobile App Development",
      category: "IT",
      status: "Active",
      employees: 6,
      description: "iOS and Android application development"
    },
  ];

  return (
    <div
      className={`p-6 rounded-lg shadow ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Service Management
        </h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-4 rounded-lg border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {service.name}
            </h3>
            <p className={`text-sm mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {service.description}
            </p>
            <div className="flex justify-between text-sm mb-2">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Category: {service.category}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  service.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {service.status}
              </span>
            </div>
            <div className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Assigned employees: {service.employees}
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-900 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceManagement;