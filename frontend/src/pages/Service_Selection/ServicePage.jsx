import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServicesByDepartment } from "../../api/serviece";
import { useDarkMode } from "../../context/DarkModeContext";
import LoadingSpinner from "../../utils/LoadingSpinner";
import ErrorDisplay from "../../utils/ErrorDisplay";
import { getItemsPerPage } from "../../utils/getItemsPerPage";
import { useDebounce } from "../../utils/useDebounce";

function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { departmentId } = useParams();
  const { darkMode } = useDarkMode();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Update itemsPerPage on window resize
  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch services by department
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!departmentId) throw new Error("Department ID is missing!");
        const response = await getServicesByDepartment(departmentId);
        setServices(response.data || response);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to fetch services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [departmentId]);

  const handleCardClick = (serviceId) => {
   navigate(`/employee/${departmentId}/${serviceId}`);
  };

  // Filter services based on debounced search term
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      service.description
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  if (loading)
    return (
      <LoadingSpinner
        darkMode={darkMode}
        height="h-screen"
        message="Loading services..."
      />
    );

  if (error)
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark:bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      } py-8 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-indigo-400" : "text-indigo-800"
            }`}
          >
            Services
          </h1>
          <p
            className={`text-lg max-w-2xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Explore our services under this department.
          </p>
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
                key={service.service_id}
                className={`rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
                onClick={() => handleCardClick(service.service_id)}
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
                      {service.category}
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
                Try adjusting your search term.
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
                  ? darkMode
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-indigo-900 text-indigo-200 hover:bg-indigo-800"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
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
                      : darkMode
                      ? "bg-indigo-900 text-indigo-200 hover:bg-indigo-800"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
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
                  ? darkMode
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-indigo-900 text-indigo-200 hover:bg-indigo-800"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Results count */}
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
