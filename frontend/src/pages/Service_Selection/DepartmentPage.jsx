import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import logo from "../../asset/logo.jpg";
import { getDepartments, searchDepartments } from "../../api/department";
import ErrorDisplay from "../../utils/ErrorDisplay";
import { getItemsPerPage } from "../../utils/getItemsPerPage";
import LoadingSpinner from "../../utils/LoadingSpinner";
import SearchBar from "../../components/Department/SearchBar";
import DepartmentGrid from "../../components/Department/DepartmentGrid";
import PaginationControls from "../../components/Department/PaginationControls";
import { debounce } from "lodash";

const DepartmentPage = () => {
  const { darkMode } = useDarkMode();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDept, setSelectedDept] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationMeta, setPaginationMeta] = useState({});

  const debouncedSearch = useRef(
    debounce((value) => fetchDepartments(1, value), 500)
  ).current;

  // Fetch departments
  const fetchDepartments = useCallback(async (page = 1, search = "") => {
    try {
      setLoading(true);
      const perPage = getItemsPerPage();
      const data = search
        ? await searchDepartments(search, page, perPage)
        : await getDepartments(page, perPage);

      if (data.data) {
        setDepartments(data.data);
        setPaginationMeta({
          current_page: data.current_page || data.meta?.current_page,
          per_page: data.per_page || data.meta?.per_page,
          total: data.total || data.meta?.total,
          last_page: data.last_page || data.meta?.last_page,
        });
      } else {
        setDepartments(data);
        setPaginationMeta({
          current_page: 1,
          per_page: perPage,
          total: data.length,
          last_page: Math.ceil(data.length / perPage),
        });
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch departments:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = debounce(
      () => fetchDepartments(currentPage, searchTerm),
      500
    );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage, searchTerm, fetchDepartments]);

  // Initial fetch
  useEffect(() => {
    fetchDepartments(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchDepartments]);

  // Search input change
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  // Memoized filtered departments
  const filteredDepartments = useMemo(() => {
    return departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dept.description &&
          dept.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        dept.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);

  // Memoized pagination
  const totalPages = useMemo(() => {
    return (
      paginationMeta.last_page ||
      Math.ceil(
        (paginationMeta.total || filteredDepartments.length) / getItemsPerPage()
      )
    );
  }, [paginationMeta, filteredDepartments.length]);

  // Memoized columns
  const { leftColumn, rightColumn } = useMemo(() => {
    const mid = Math.ceil(filteredDepartments.length / 2);
    return {
      leftColumn: filteredDepartments.slice(0, mid),
      rightColumn: filteredDepartments.slice(mid),
    };
  }, [filteredDepartments]);

  // Memoized pagination numbers
  const { pageNumbers, startPage, endPage } = useMemo(() => {
    const maxPageNumbers = 5;
    let start = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let end = Math.min(totalPages, start + maxPageNumbers - 1);
    if (end - start + 1 < maxPageNumbers) {
      start = Math.max(1, end - maxPageNumbers + 1);
    }
    const numbers = [];
    for (let i = start; i <= end; i++) numbers.push(i);
    return { pageNumbers: numbers, startPage: start, endPage: end };
  }, [currentPage, totalPages]);

  // Pagination handlers
  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);
  const nextPage = useCallback(
    () => currentPage < totalPages && setCurrentPage(currentPage + 1),
    [currentPage, totalPages]
  );
  const prevPage = useCallback(
    () => currentPage > 1 && setCurrentPage(currentPage - 1),
    [currentPage]
  );

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={() => fetchDepartments(currentPage, searchTerm)}
        title="Error Loading Departments"
        retryText="Try Again"
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-5 opacity-5">
        <img
          src={logo}
          alt="Company Logo"
          loading="lazy"
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

        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          darkMode={darkMode}
        />

        {loading ? (
          <LoadingSpinner
            height="h-64"
            size="h-16 w-16"
            spinnerType="ring"
            message="Loading departments..."
          />
        ) : (
          <>
            <DepartmentGrid
              leftColumn={leftColumn}
              rightColumn={rightColumn}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              setSelectedDept={setSelectedDept}
            />

            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                prevPage={prevPage}
                nextPage={nextPage}
                darkMode={darkMode}
                startPage={startPage}
                endPage={endPage}
                pageNumbers={pageNumbers}
              />
            )}

            <p
              className={`text-center mt-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Page {currentPage} of {totalPages} | Showing{" "}
              {filteredDepartments.length} of{" "}
              {paginationMeta.total || filteredDepartments.length} departments
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DepartmentPage;
