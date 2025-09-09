import React, { useContext, useState } from "react";
import ThemeContext from "../../../context/ThemeContext";
import AddDepartmentForm from "./AddDepartmentForm"; // Import the form component

const EmployeeManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);

  // Demo data for employees
  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Manager",
      department: "Operations",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Developer",
      department: "IT",
      status: "Active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "Designer",
      department: "Creative",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "Marketing Specialist",
      department: "Marketing",
      status: "Active",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "HR Manager",
      department: "Human Resources",
      status: "Active",
    },
  ];

  const handleAddDepartment = (departmentData) => {
    // Handle the department creation logic here
    console.log("Creating department with data:", departmentData);
    // You would typically dispatch an action or make an API call here
  };

  return (
    <>
      <div
        className={`p-6 rounded-lg shadow ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Employee Management
          </h2>
          <button 
            onClick={() => setIsAddDepartmentOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Add Department
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={
                  isDarkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-600"
                }
              >
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className={`border-b ${
                    isDarkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className={`px-4 py-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {employee.name}
                  </td>
                  <td className={`px-4 py-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {employee.email}
                  </td>
                  <td className={`px-4 py-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {employee.role}
                  </td>
                  <td className={`px-4 py-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {employee.department}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddDepartmentForm
        isOpen={isAddDepartmentOpen}
        onClose={() => setIsAddDepartmentOpen(false)}
        onSave={handleAddDepartment}
      />
    </>
  );
};

export default EmployeeManagement;