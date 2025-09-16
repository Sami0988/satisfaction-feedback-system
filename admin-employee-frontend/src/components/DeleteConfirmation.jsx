import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, admin }) => {
  const { isDarkMode } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Confirm Deletion
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

        <div
          className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          <p>Are you sure you want to delete ?</p>

          <p className="mt-4 text-red-500 font-medium">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
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
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
