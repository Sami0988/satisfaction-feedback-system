import React, { useContext, useState } from "react";
import ThemeContext from "../../../context/ThemeContext";
import AddDepartmentForm from "./AddDepartmentForm";

const DepartmentManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Operations",
      floor: "3rd Floor",
      email: "operations@company.com",
      phone: "+1 (555) 123-4567",
      admin: "John Doe",
      adminEmail: "john.doe@company.com",
      employeeCount: 15,
      status: "Active",
    },
    {
      id: 2,
      name: "Information Technology",
      floor: "2nd Floor",
      email: "it@company.com",
      phone: "+1 (555) 234-5678",
      admin: "Jane Smith",
      adminEmail: "jane.smith@company.com",
      employeeCount: 12,
      status: "Active",
    },
    {
      id: 3,
      name: "Creative Design",
      floor: "4th Floor",
      email: "creative@company.com",
      phone: "+1 (555) 345-6789",
      admin: "Robert Johnson",
      adminEmail: "robert.j@company.com",
      employeeCount: 8,
      status: "Active",
    },
    {
      id: 4,
      name: "Marketing",
      floor: "1st Floor",
      email: "marketing@company.com",
      phone: "+1 (555) 456-7890",
      admin: "Sarah Williams",
      adminEmail: "sarah.w@company.com",
      employeeCount: 10,
      status: "Active",
    },
    {
      id: 5,
      name: "Human Resources",
      floor: "1st Floor",
      email: "hr@company.com",
      phone: "+1 (555) 567-8901",
      admin: "Michael Brown",
      adminEmail: "michael.b@company.com",
      employeeCount: 6,
      status: "Active",
    },
    {
      id: 6,
      name: "Finance",
      floor: "5th Floor",
      email: "finance@company.com",
      phone: "+1 (555) 678-9012",
      admin: "Emily Davis",
      adminEmail: "emily.d@company.com",
      employeeCount: 9,
      status: "Inactive",
    },
  ]);

  const handleAddDepartment = (departmentData) => {
    // Create a new department with the form data
    const newDepartment = {
      id: departments.length + 1,
      name: departmentData.departmentName,
      floor: departmentData.floor,
      email: departmentData.departmentEmail,
      phone: departmentData.departmentPhone,
      admin: departmentData.adminFullName,
      adminEmail: departmentData.adminEmail,
      employeeCount: 0, // New department starts with 0 employees
      status: "Active",
    };

    // Add the new department to the list
    setDepartments([...departments, newDepartment]);
    console.log("Department created:", newDepartment);
  };

  const handleDeleteDepartment = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((dept) => dept.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id
          ? {
              ...dept,
              status: dept.status === "Active" ? "Inactive" : "Active",
            }
          : dept
      )
    );
  };

  return (
    <>
      <div
        className={`p-6 rounded-lg shadow ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Department Management
          </h2>
          <button
            onClick={() => setIsAddDepartmentOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Add Department
          </button>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-blue-50"
            } border-l-4 border-blue-500`}
          >
            <h3
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-blue-800"
              }`}
            >
              Total Departments
            </h3>
            <p
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-blue-900"
              }`}
            >
              {departments.length}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-green-50"
            } border-l-4 border-green-500`}
          >
            <h3
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-green-800"
              }`}
            >
              Active Departments
            </h3>
            <p
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-green-900"
              }`}
            >
              {departments.filter((dept) => dept.status === "Active").length}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-yellow-50"
            } border-l-4 border-yellow-500`}
          >
            <h3
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-yellow-800"
              }`}
            >
              Inactive Departments
            </h3>
            <p
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-yellow-900"
              }`}
            >
              {departments.filter((dept) => dept.status === "Inactive").length}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-purple-50"
            } border-l-4 border-purple-500`}
          >
            <h3
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-purple-800"
              }`}
            >
              Total Employees
            </h3>
            <p
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-purple-900"
              }`}
            >
              {departments.reduce(
                (total, dept) => total + dept.employeeCount,
                0
              )}
            </p>
          </div>
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
                <th className="px-4 py-2 text-left">Department Name</th>
                <th className="px-4 py-2 text-left">Floor</th>
                <th className="px-4 py-2 text-left">Contact Info</th>
                <th className="px-4 py-2 text-left">Department Admin</th>
                <th className="px-4 py-2 text-left">Employees</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr
                  key={department.id}
                  className={`border-b ${
                    isDarkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td
                    className={`px-4 py-3 font-medium ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {department.name}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {department.floor}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <div>{department.email}</div>
                    <div className="text-sm">{department.phone}</div>
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <div>{department.admin}</div>
                    <div className="text-sm">{department.adminEmail}</div>
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {department.employeeCount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        department.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {department.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleStatus(department.id)}
                      className={`mr-2 text-xs px-2 py-1 rounded ${
                        department.status === "Active"
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-green-200 text-green-700 hover:bg-green-300"
                      }`}
                    >
                      {department.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDeleteDepartment(department.id)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {departments.length === 0 && (
          <div
            className={`text-center py-8 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No departments found. Click "Add Department" to create one.
          </div>
        )}
      </div>

      <AddDepartmentForm
        isOpen={isAddDepartmentOpen}
        onClose={() => setIsAddDepartmentOpen(false)}
        onSave={handleAddDepartment}
      />
    </>
  );
};

export default DepartmentManagement;
