import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import ThemeContext from "../../../context/ThemeContext";
import { patchUpdateDepartmentApi } from "../../../api/superAdmin/createDepartmentApi";
import { toast } from "react-toastify";

const EditDepartmentAdmin = ({ isOpen, onClose, admin, refreshList }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();

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

  const [loading, setLoading] = useState(false);

  // Populate form when admin is selected
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin) return;

    try {
      setLoading(true);

      // Prepare only changed fields
      const updatedFields = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== admin[key] && formData[key] !== "") {
          // Map admin fields to backend fields
          if (key === "adminFullName") updatedFields.full_name = formData[key];
          else if (key === "adminEmail") updatedFields.email = formData[key];
          else if (key === "adminPhone") updatedFields.phone = formData[key];
          else updatedFields[key] = formData[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        toast.info("No changes to update.");
        setLoading(false);
        return;
      }

      await patchUpdateDepartmentApi(admin.department_id, updatedFields);
      toast.success("Department updated successfully!");
      onClose();
      if (refreshList) refreshList(); // optional: refresh department list
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        Object.values(errors).forEach((msg) => toast.error(msg));
      } else {
        toast.error("Failed to update department");
      }
    } finally {
      setLoading(false);
    }
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
            {/* Admin Full Name */}
            <InputField
              label="Admin Full Name"
              name="adminFullName"
              value={formData.adminFullName}
              onChange={handleChange}
              required
              isDarkMode={isDarkMode}
            />
            {/* Admin Email */}
            <InputField
              label="Admin Email"
              name="adminEmail"
              type="email"
              value={formData.adminEmail}
              onChange={handleChange}
              required
              isDarkMode={isDarkMode}
            />
            {/* Admin Phone */}
            <InputField
              label="Admin Phone"
              name="adminPhone"
              type="tel"
              value={formData.adminPhone}
              onChange={handleChange}
              required
              isDarkMode={isDarkMode}
            />
            {/* Admin Role */}
            <InputField
              label="Admin Role"
              name="adminRole"
              value={formData.adminRole}
              onChange={handleChange}
              required
              isDarkMode={isDarkMode}
            />
            {/* Department Name */}
            <InputField
              label="Department Name"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              required
              isDarkMode={isDarkMode}
            />
            {/* Department Email */}
            <InputField
              label="Department Email"
              name="departmentEmail"
              type="email"
              value={formData.departmentEmail}
              onChange={handleChange}
              isDarkMode={isDarkMode}
            />
            {/* Floor */}
            <InputField
              label="Floor"
              name="floor"
              type="number"
              value={formData.floor}
              onChange={handleChange}
              isDarkMode={isDarkMode}
            />
            {/* Status */}
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
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  isDarkMode,
}) => (
  <div>
    <label
      className={`block text-sm font-medium mb-1 ${
        isDarkMode ? "text-gray-300" : "text-gray-700"
      }`}
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-3 py-2 border rounded-md ${
        isDarkMode
          ? "bg-gray-700 text-white border-gray-600"
          : "bg-white text-gray-900 border-gray-300"
      }`}
    />
  </div>
);

export default EditDepartmentAdmin;
