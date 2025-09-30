// components/services/ServicesManagement.js
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeContext from "../../../context/ThemeContext";
import {
  fetchDepartmentData,
  addEmployeeAndService,
} from "../../../redux/slices/departmentHeadSlice";

const ServicesManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();

  // Get services from Redux
  const services = useSelector((state) => state.departmentHead.services || []);
  const loading = useSelector((state) => state.departmentHead.loading);

  const [newService, setNewService] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const categories = ["IT", "Design", "Marketing", "Support", "Consulting"];

  useEffect(() => {
    // Fetch services from backend when component mounts
    dispatch(fetchDepartmentData());
  }, [dispatch]);

  const handleAddService = async () => {
    if (newService.name && newService.category && newService.description) {
      try {
        // We pass only the service object to the backend
        await dispatch(
          addEmployeeAndService({ service: newService })
        ).unwrap();

        setNewService({ name: "", category: "", description: "" });
        setIsAdding(false);
      } catch (error) {
        console.error("Failed to add service:", error);
      }
    }
  };

  const toggleServiceStatus = (id) => {
    // You can implement this similarly if your backend supports status updates
    // For now, we can keep it local
  };

  const getStatusBadgeClass = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  return (
    <div
      className={`rounded-lg shadow ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Services Management</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span> Add Service
        </button>
      </div>

      {isAdding && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <h3 className="text-lg font-medium mb-3">Add New Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <input
              type="text"
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
              className={`p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
            <input
              type="text"
              placeholder="Category"
              value={newService.category}
              onChange={(e) =>
                setNewService({ ...newService, category: e.target.value })
              }
              className={`p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
            <input
              type="text"
              placeholder="description"
              value={newService.description}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
              className={`p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAddService}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode
                      ? "text-gray-300 bg-gray-700"
                      : "text-gray-500 bg-gray-50"
                  }`}
                >
                  Service Name
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode
                      ? "text-gray-300 bg-gray-700"
                      : "text-gray-500 bg-gray-50"
                  }`}
                >
                  Category
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode
                      ? "text-gray-300 bg-gray-700"
                      : "text-gray-500 bg-gray-50"
                  }`}
                >
                  discription
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode
                      ? "text-gray-300 bg-gray-700"
                      : "text-gray-500 bg-gray-50"
                  }`}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y divide-gray-200 dark:divide-gray-700 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              {services.map((service) => (
                <tr key={service.service_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {service.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {service.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        service.status
                      )}`}
                    >
                      {service.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;
