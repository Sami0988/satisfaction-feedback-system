// src/components/Department/SearchBar.jsx
import React from "react";

const SearchBar = ({ value, onChange, darkMode }) => {
  return (
    <div className="flex justify-center mb-10">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search departments..."
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-600"
              : "bg-white border-gray-300 text-gray-800 focus:ring-blue-500"
          }`}
        />
        <div className="absolute right-3 top-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
