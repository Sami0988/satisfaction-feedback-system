import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDepartment,
  clearDepartmentState,
} from "../../../redux/slices/departmentSlice";
import ThemeContext from "../../../context/ThemeContext";
import { toast } from "react-toastify";

const AddDepartmentForm = ({ isOpen, onClose, onSave }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const { loading, success, error, fieldErrors } = useSelector(
    (state) => state.department
  );

  const [formData, setFormData] = useState({
    departmentName: "",
    floor: "",
    departmentEmail: "",
    departmentPhone: "",
    adminFullName: "",
    adminEmail: "",
    adminPhone: "",
    adminRole: "Department Admin",
  });

  useEffect(() => {
    if (success) {
      setFormData({
        departmentName: "",
        floor: "",
        departmentEmail: "",
        departmentPhone: "",
        adminFullName: "",
        adminEmail: "",
        adminPhone: "",
        adminRole: "Department Admin",
      });
      dispatch(clearDepartmentState());
      onClose();
    }
  }, [success, dispatch, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double click

    try {
      await dispatch(createDepartment(formData)).unwrap();
      toast.success("Department created successfully!");

      // call the onSave callback to notify parent
      if (onSave) {
        onSave(formData);
      }

      setFormData({
        departmentName: "",
        floor: "",
        departmentEmail: "",
        departmentPhone: "",
        adminFullName: "",
        adminEmail: "",
        adminPhone: "",
        adminRole: "Department Admin",
      });

      dispatch(clearDepartmentState());
      onClose();
    } catch (error) {
      toast.error(error || "Failed to create department");
    }
  };


  if (!isOpen) return null;

  const getFieldError = (field) =>
    fieldErrors?.[field] ? fieldErrors[field][0] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl transform transition-all ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-700">
          <h3 className="text-xl font-medium">Add New Department</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleSubmit}>
            {/* Department Info */}
            <h3 className="text-lg font-medium mb-4">Department Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Department Name *
                </label>
                <input
                  type="text"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Floor</label>
                <input
                  type="text"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Department Email *
                </label>
                <input
                  type="email"
                  name="departmentEmail"
                  value={formData.departmentEmail}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Department Phone
                </label>
                <input
                  type="tel"
                  name="departmentPhone"
                  value={formData.departmentPhone}
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Admin Info */}
            <h3 className="text-lg font-medium mb-4">
              Department Admin Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="adminFullName"
                  value={formData.adminFullName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="adminPhone"
                  value={formData.adminPhone}
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  name="adminRole"
                  value="Department Admin"
                  readOnly
                  className="w-full p-2 rounded border bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 mb-3">
                {typeof error === "string"
                  ? error
                  : "Failed to create department"}
              </p>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Department"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentForm;
