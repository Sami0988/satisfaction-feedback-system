import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";

const EditDepartmentAdmin = ({ isOpen, onClose, onSave, admin }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    adminFullName: "",
    adminEmail: "",
    adminPhone: "",
    adminRole: "",
    departmentName: "",
    departmentEmail: "",
    departmentPhone: "",
    floor: "",
    status: "Active",
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        adminFullName: admin.adminFullName || "",
        adminEmail: admin.adminEmail || "",
        adminPhone: admin.adminPhone || "",
        adminRole: admin.adminRole || "",
        departmentName: admin.departmentName || "",
        departmentEmail: admin.departmentEmail || "",
        departmentPhone: admin.departmentPhone || "",
        floor: admin.floor || "",
        status: admin.status || "Active",
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`w-full max-w-2xl p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Edit Department Admin
          </h2>
          <button
            onClick={onClose}
            className={`text-2xl ${
              isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Admin Full Name
              </label>
              <input
                type="text"
                name="adminFullName"
                value={formData.adminFullName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Admin Email
              </label>
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Admin Phone
              </label>
              <input
                type="tel"
                name="adminPhone"
                value={formData.adminPhone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Admin Role
              </label>
              <input
                type="text"
                name="adminRole"
                value={formData.adminRole}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Department Name
              </label>
              <input
                type="text"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Department Email
              </label>
              <input
                type="email"
                name="departmentEmail"
                value={formData.departmentEmail}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Department Phone
              </label>
              <input
                type="tel"
                name="departmentPhone"
                value={formData.departmentPhone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Floor
              </label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${
                isDarkMode
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartmentAdmin;
