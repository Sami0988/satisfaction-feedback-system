import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditEmployee = ({ employee, onClose, onSuccess }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    role_name: "",
    department_name: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        full_name: employee.full_name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        role_name: employee.role_name || "",
        department_name: employee.department_name || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   //await dispatch(
    //     updateEmployee({ id: employee.employee_id, data: formData })
    //   ).unwrap();
      toast.success("Employee updated successfully!");
      onSuccess();
    } catch (error) {
      toast.error("Failed to update employee");
    }
  };

  if (!employee) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div
        className={`relative w-full max-w-2xl p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Employee</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              name="role_name"
              value={formData.role_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              name="department_name"
              value={formData.department_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
