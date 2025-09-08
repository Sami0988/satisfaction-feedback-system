// components/employees/EmployeeManagement.js
import React, { useState, useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";
import AddEmployee from "./AddEmployee";

const EmployeeManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "Developer",
      status: "Active",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Designer",
      status: "Active",
      email: "jane@example.com",
    },
    {
      id: 3,
      name: "Robert Johnson",
      position: "Manager",
      status: "Inactive",
      email: "robert@example.com",
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Marketing",
      status: "Active",
      email: "sarah@example.com",
    },
  ]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleEmployeeStatus = (id) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id
          ? { ...emp, status: emp.status === "Active" ? "Inactive" : "Active" }
          : emp
      )
    );
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
        <h2 className="text-xl font-bold">Employee Management</h2>
        <button
          onClick={() => setIsSheetOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span> Add Employee
        </button>
      </div>

      {isSheetOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsSheetOpen(false)}
          ></div>

          {/* Sheet */}
          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 shadow-xl p-8 overflow-y-auto rounded-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-5">
              <button
                onClick={() => setIsSheetOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* ✅ Form content */}
            <AddEmployee />
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
                Name
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode
                    ? "text-gray-300 bg-gray-700"
                    : "text-gray-500 bg-gray-50"
                }`}
              >
                Position
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode
                    ? "text-gray-300 bg-gray-700"
                    : "text-gray-500 bg-gray-50"
                }`}
              >
                Email
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
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {employee.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {employee.position}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {employee.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      employee.status
                    )}`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => toggleEmployeeStatus(employee.id)}
                    className={`mr-2 ${
                      employee.status === "Active"
                        ? "text-red-600 hover:text-red-900"
                        : "text-green-600 hover:text-green-900"
                    }`}
                  >
                    {employee.status === "Active" ? "Deactivate" : "Activate"}
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
    </div>
  );
};

export default EmployeeManagement;
