import React, { useState } from "react";
import data from "./Data/Department";
import { useDarkMode } from "../../context/DarkModeContext";
import DepartmentCard from "./DepartmentCard";
import logo from "../../asset/logo.jpg";

const DepartmentPage = () => {
  const { darkMode } = useDarkMode();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDept, setSelectedDept] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter departments based on search term
  const filteredDepartments = data.departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Constants for pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  // Get current departments for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDepartments = filteredDepartments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Split into left and right columns (3 each)
  const leftColumn = currentDepartments.slice(0, 3);
  const rightColumn = currentDepartments.slice(3, 6);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous and next page handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  // Close modal
  const closeModal = () => {
    setSelectedDept(null);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      {/* Full-screen background logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-5 opacity-50">
        <img
          src={logo}
          alt="Company Logo"
          className="w-full h-full object-cover rounded-full max-w-4xl max-h-4xl"
        />
      </div>

      <div className="w-full max-w-7xl 2xl:max-w-8xl relative z-10">
        <h1
          className={`text-4xl font-bold text-center mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Departments
        </h1>
        <p
          className={`text-center mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Click on a department to Get Your Service
        </p>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={handleSearchChange}
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

        {/* Department Grid - 3 left, 3 right with space in the middle */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-12">
          {/* Left Column - 3 cards */}
          <div className="flex-1 grid grid-cols-1 gap-6">
            {leftColumn.map((dept, index) => (
              <DepartmentCard
                key={dept.id}
                dept={dept}
                index={index}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                
              />
            ))}
          </div>

          {/* Spacer for the middle (where logo appears in background) */}
          <div className="hidden lg:block w-16"></div>

          {/* Right Column - 3 cards */}
          <div className="flex-1 grid grid-cols-1 gap-6">
            {rightColumn.map((dept, index) => (
              <DepartmentCard
                key={dept.id}
                dept={dept}
                index={index + 3}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                
              />
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? "bg-blue-600 dark:bg-blue-700 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>

        <p
          className={`text-center mt-4 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Page {currentPage} of {totalPages} | Showing{" "}
          {currentDepartments.length} of {filteredDepartments.length}{" "}
          departments
        </p>
      </div>

      {/* Modal for displaying department details */}
      {selectedDept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`rounded-2xl max-w-md w-full p-6 transform scale-95 animate-scaleIn ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4 rounded-xl mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-3xl mr-3">🏢</span>
                <h2 className="text-2xl font-bold">{selectedDept.name}</h2>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {selectedDept.description}
            </p>

            <div
              className={`p-4 rounded-xl mb-4 ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <h3
                className={`font-semibold mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Department Details:
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Code: {selectedDept.code}</li>
                <li>ID: {selectedDept.id}</li>
                <li>
                  {selectedDept.parent_id
                    ? `Sub-department of: ${selectedDept.parent_id}`
                    : "Main Department"}
                </li>
              </ul>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Contact {selectedDept.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
