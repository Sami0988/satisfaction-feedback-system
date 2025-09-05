// components/employees/EmployeeManagement.js
import React, { useState, useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";

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

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    email: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.email) {
      const employee = {
        id: employees.length + 1,
        name: newEmployee.name,
        position: newEmployee.position,
        email: newEmployee.email,
        status: "Active",
      };

      setEmployees([...employees, employee]);
      setNewEmployee({ name: "", position: "", email: "" });
      setIsAdding(false);
    }
  };

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
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span> Add Employee
        </button>
      </div>

      {isAdding && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <h3 className="text-lg font-medium mb-3">Add New Employee</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <input
              type="text"
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              className={`p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
            <input
              type="text"
              placeholder="Position"
              value={newEmployee.position}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, position: e.target.value })
              }
              className={`p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
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
              onClick={handleAddEmployee}
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
