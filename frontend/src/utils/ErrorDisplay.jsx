import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

const ErrorDisplay = ({
  error,
  onRetry,
  title = "Error Loading Content",
  retryText = "Try Again",
}) => {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-blue-50"
      }`}
    >
      <div
        className={`p-6 rounded-lg text-center max-w-md mx-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        {/* Error Icon */}
        <div className="mb-4">
          <svg
            className={`w-16 h-16 mx-auto ${
              darkMode ? "text-red-500" : "text-red-600"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        <h2
          className={`text-xl font-bold mb-3 ${
            darkMode ? "text-white" : "text-red-600"
          }`}
        >
          {title}
        </h2>

        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {error}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {retryText}
          </button>
        )}

        {/* Additional help text */}
        <p
          className={`text-sm mt-4 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};

// Optional: Specific error components for different scenarios
export const DepartmentErrorDisplay = ({ error, onRetry }) => (
  <ErrorDisplay
    error={error}
    onRetry={onRetry}
    title="Error Loading Departments"
    retryText="Try Again"
  />
);

export const NetworkErrorDisplay = ({ onRetry }) => (
  <ErrorDisplay
    error="Network connection failed. Please check your internet connection and try again."
    onRetry={onRetry}
    title="Connection Error"
    retryText="Retry Connection"
  />
);

export const NotFoundErrorDisplay = ({ resource = "content" }) => (
  <ErrorDisplay
    error={`The requested ${resource} could not be found.`}
    onRetry={null}
    title="Not Found"
  />
);

export default ErrorDisplay;
