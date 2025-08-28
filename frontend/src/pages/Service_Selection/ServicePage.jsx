import { useState, useEffect } from "react";
import departmentServices from "./Data/service";
import { useNavigate } from "react-router-dom";

function ServicesPage() {
  // Sample data grouped by department
  // State for search, current page, and items per page
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (serviceId) => {
    navigate(`/employee`); // 👈 dynamic route
  };

  // Flatten all services for searching and pagination
  const allServices = departmentServices.flatMap((dept) =>
    dept.services.map((service) => ({
      ...service,
      department: dept.department,
    }))
  );

  // Filter services based on search term
  const filteredServices = allServices.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Effect to apply dark mode to the entire page
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark:bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      } py-8 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with dark mode toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center md:text-left">
            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-indigo-400" : "text-indigo-800"
              } mb-4`}
            >
              Our Services
            </h1>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl`}
            >
              Explore our comprehensive range of services designed to meet your
              business needs.
            </p>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              darkMode
                ? "bg-indigo-600 text-yellow-200"
                : "bg-gray-200 text-gray-700"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
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
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
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
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search services..."
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {currentItems.length > 0 ? (
            currentItems.map((service) => (
              <div
                key={service.id}
                className={`rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
                onClick={handleCardClick} // 👈 navigate on click
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className={`p-3 rounded-lg mr-4 ${
                        darkMode ? "bg-indigo-900" : "bg-indigo-100"
                      }`}
                    >
                      <svg
                        className={`h-6 w-6 ${
                          darkMode ? "text-indigo-400" : "text-indigo-600"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3
                      className={`text-xl font-semibold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {service.name}
                    </h3>
                  </div>
                  <p
                    className={`mb-4 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${
                        darkMode
                          ? "bg-indigo-900 text-indigo-200"
                          : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      {service.department}
                    </span>
                    <button
                      className={`font-medium flex items-center ${
                        darkMode
                          ? "text-indigo-400 hover:text-indigo-300"
                          : "text-indigo-600 hover:text-indigo-800"
                      }`}
                    >
                      Learn more
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`col-span-full text-center py-12 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3
                className={`mt-4 text-lg font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                No services found
              </h3>
              <p
                className={`mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Try adjusting your search term or filter.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredServices.length > 0 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                currentPage === 1
                  ? `cursor-not-allowed ${
                      darkMode
                        ? "bg-gray-700 text-gray-500"
                        : "bg-gray-200 text-gray-400"
                    }`
                  : `${
                      darkMode
                        ? "bg-indigo-900 text-indigo-200 hover:bg-indigo-800"
                        : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                    }`
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    currentPage === number
                      ? "bg-indigo-600 text-white"
                      : `${
                          darkMode
                            ? "bg-indigo-900 text-indigo-200 hover:bg-indigo-800"
                            : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                        }`
                  }`}
                >
                  {number}
                </button>
              )
            )}

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                currentPage === totalPages
                  ? `cursor-not-allowed ${
                      darkMode
                        ? "bg-gray-700 text-gray-500"
                        : "bg-gray-200 text-gray-400"
                    }`
                  : `${
                      darkMode
                        ? "bg-indigo-900 text-indigo-200 hover:bg-indigo-800"
                        : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                    }`
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Results for the count */}
        <div
          className={`mt-4 text-center text-sm ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Showing {currentItems.length} of {filteredServices.length} services
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
