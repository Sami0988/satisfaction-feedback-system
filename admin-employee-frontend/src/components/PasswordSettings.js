import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";

const PasswordSettings = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Password change submitted");
  };

  return (
    <div
      className={`rounded-lg shadow ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } p-4 md:p-6`}
    >
      <h2 className="text-lg font-bold mb-4">Password Settings</h2>

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`w-full p-2 rounded border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full p-2 rounded border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-2 rounded border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Update Password
        </button>
      </form>

      <div
        className={`mt-8 p-4 rounded-lg ${
          isDarkMode ? "bg-gray-700" : "bg-gray-50"
        }`}
      >
        <h3 className="font-medium mb-2">Password Requirements</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-xs">Minimum 8 characters</li>
          <li className="text-xs">At least one uppercase letter</li>
          <li className="text-xs">At least one number</li>
          <li className="text-xs">At least one special character</li>
        </ul>
      </div>
    </div>
  );
};
export default PasswordSettings;