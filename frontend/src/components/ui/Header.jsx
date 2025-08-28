// src/components/Header.js
import React, { memo } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import logo from "../../asset/logo.jpg";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="dark:bg-gray-900 bg-white text-gray-800 dark:text-white shadow-md py-3 px-4 transition-colors duration-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-md md:text-3xl">
            <img
              src={logo}
              alt="Logo"
              className="h-6 w-6 object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <h1 className="text-xl font-bold">
            Ethiopian Civil Service Commission
          </h1>
        </div>

        {/* Navigation and Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full dark:bg-gray-700 bg-gray-200 transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              // Sun icon for light mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
