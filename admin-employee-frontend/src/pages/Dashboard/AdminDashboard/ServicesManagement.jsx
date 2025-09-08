// components/services/ServicesManagement.js
import React, { useState, useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";

const ServicesManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Web Development",
      category: "IT",
      price: "$100",
      status: "Active",
    },
    {
      id: 2,
      name: "Graphic Design",
      category: "Design",
      price: "$80",
      status: "Active",
    },
    {
      id: 3,
      name: "Content Writing",
      category: "Marketing",
      price: "$50",
      status: "Inactive",
    },
    {
      id: 4,
      name: "SEO Optimization",
      category: "Marketing",
      price: "$120",
      status: "Active",
    },
  ]);

  const [newService, setNewService] = useState({
    name: "",
    category: "",
    price: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddService = () => {
    if (newService.name && newService.category && newService.price) {
      const service = {
        id: services.length + 1,
        name: newService.name,
        category: newService.category,
        price: newService.price,
        status: "Active",
      };

      setServices([...services, service]);
      setNewService({ name: "", category: "", price: "" });
      setIsAdding(false);
    }
  };

  const toggleServiceStatus = (id) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? {
              ...service,
              status: service.status === "Active" ? "Inactive" : "Active",
            }
          : service
      )
    );
  };

  const getStatusBadgeClass = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  const categories = ["IT", "Design", "Marketing", "Support", "Consulting"];

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
            <select
              value={newService.category}
              onChange={(e) =>
                setNewService({ ...newService, category: e.target.value })
              }
              className={`p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Price"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
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
                Price
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
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode
                    ? "text-gray-300 bg-gray-700"
                    : "text-gray-500 bg-gray-50"
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y divide-gray-200 dark:divide-gray-700 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {service.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {service.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {service.price}
                  </div>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => toggleServiceStatus(service.id)}
                    className={`mr-2 ${
                      service.status === "Active"
                        ? "text-red-600 hover:text-red-900"
                        : "text-green-600 hover:text-green-900"
                    }`}
                  >
                    {service.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Service Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg text-center ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <span
                className={`font-medium ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {category}
              </span>
              <div className="mt-2 text-sm text-gray-500">
                {services.filter((s) => s.category === category).length}{" "}
                services
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesManagement;
