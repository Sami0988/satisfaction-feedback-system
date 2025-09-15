import React, { useContext, useState } from "react";
import ThemeContext from "../../../context/ThemeContext";
import AddDepartmentForm from "./AddDepartmentForm";
import EditDepartmentAdmin from "./EditDepartmentAdmin";
import DeleteConfirmation from "../../../components/DeleteConfirmation";


const EmployeeManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Department admin data
  const [departmentAdmins, setDepartmentAdmins] = useState([
    {
      id: 1,
      adminEmail: "samuasami84@gmail.com",
      adminFullName: "samuel zelalem",
      adminPhone: "0930584110",
      adminRole: "Department Admin",
      departmentEmail: "icmis@gmail.com",
      departmentName: "Isemis",
      departmentPhone: "89382932094",
      floor: "6",
      status: "Active",
    },
    {
      id: 2,
      adminEmail: "admin2@example.com",
      adminFullName: "Second Admin",
      adminPhone: "0912345678",
      adminRole: "Department Admin",
      departmentEmail: "dept2@example.com",
      departmentName: "Department Two",
      departmentPhone: "0987654321",
      floor: "3",
      status: "Active",
    },
    {
      id: 3,
      adminEmail: "admin3@example.com",
      adminFullName: "Third Admin",
      adminPhone: "0923456789",
      adminRole: "Department Admin",
      departmentEmail: "dept3@example.com",
      departmentName: "Department Three",
      departmentPhone: "0976543210",
      floor: "4",
      status: "Inactive",
    },
    {
      id: 4,
      adminEmail: "admin4@example.com",
      adminFullName: "Fourth Admin",
      adminPhone: "0934567890",
      adminRole: "Department Admin",
      departmentEmail: "dept4@example.com",
      departmentName: "Department Four",
      departmentPhone: "0965432109",
      floor: "2",
      status: "Active",
    },
    {
      id: 5,
      adminEmail: "admin5@example.com",
      adminFullName: "Fifth Admin",
      adminPhone: "0945678901",
      adminRole: "Department Admin",
      departmentEmail: "dept5@example.com",
      departmentName: "Department Five",
      departmentPhone: "0954321098",
      floor: "5",
      status: "Active",
    },
  ]);

  const handleAddDepartment = (departmentData) => {
    console.log("Creating department with data:", departmentData);
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleDelete = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateAdmin = (updatedAdminData) => {
    console.log("Updating admin with data:", updatedAdminData);
    // Update the admin in the state
    setDepartmentAdmins((prev) =>
      prev.map((admin) =>
        admin.id === selectedAdmin.id
          ? { ...admin, ...updatedAdminData }
          : admin
      )
    );
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Remove the admin from the state
    setDepartmentAdmins((prev) =>
      prev.filter((admin) => admin.id !== selectedAdmin.id)
    );
    setIsDeleteModalOpen(false);
    setSelectedAdmin(null);
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
            Department Admin Management
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
                <th className="px-4 py-2 text-left">Admin Name</th>
                <th className="px-4 py-2 text-left">Admin Email</th>
                <th className="px-4 py-2 text-left">Admin Phone</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Department Email</th>
                <th className="px-4 py-2 text-left">Floor</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departmentAdmins.map((admin) => (
                <tr
                  key={admin.id}
                  className={`border-b ${
                    isDarkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {admin.adminFullName}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {admin.adminEmail}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {admin.adminPhone}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {admin.departmentName}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {admin.departmentEmail}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {admin.floor}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        admin.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin)}
                      className="text-red-600 hover:text-red-900"
                    >
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

      <EditDepartmentAdmin
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateAdmin}
        admin={selectedAdmin}
      />

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        admin={selectedAdmin}
      />
    </>
  );
};

export default EmployeeManagement;
