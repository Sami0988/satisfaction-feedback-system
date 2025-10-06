import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../../context/ThemeContext";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartmentData,
  deleteEmployee,
} from "../../../redux/slices/departmentHeadSlice";
import { toast } from "react-toastify";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  Filter,
} from "lucide-react";

const EmployeeManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.departmentHead);

  const [showAdd, setShowAdd] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Fetch employees on mount
  useEffect(() => {
    dispatch(fetchDepartmentData());
  }, [dispatch]);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort employees
  const sortedEmployees = React.useMemo(() => {
    if (!sortConfig.key) return filteredEmployees;

    return [...filteredEmployees].sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredEmployees, sortConfig]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteEmployee(id));
      toast.success("Employee deleted successfully");
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕️";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-blue-900/20" : "bg-blue-100"
              }`}
            >
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Employee Management
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage your team members and their details
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search employees by name, email, role, or department..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
            />
          </div>

          {/* Results Count */}
          <div
            className={`px-4 py-3 rounded-xl border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <span className="text-sm font-medium">
              {filteredEmployees.length} employee
              {filteredEmployees.length !== 1 ? "s" : ""} found
            </span>
          </div>
        </div>

        {/* Employee Table */}
        <div
          className={`rounded-2xl shadow-lg overflow-hidden border transition-all duration-200 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}>
                <tr>
                  {[
                    { key: "full_name", label: "Full Name" },
                    { key: "email", label: "Email" },
                    { key: "phone", label: "Phone" },
                    { key: "role_name", label: "Role" },
                    { key: "department_name", label: "Department" },
                    { key: "actions", label: "Actions" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase cursor-pointer transition-colors ${
                        key !== "actions"
                          ? "hover:bg-gray-200 dark:hover:bg-gray-600"
                          : ""
                      } ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                      onClick={() => key !== "actions" && handleSort(key)}
                    >
                      <div className="flex items-center gap-1">
                        {label}
                        {key !== "actions" && (
                          <span className="text-xs">{getSortIcon(key)}</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                      <p className="mt-2 text-gray-500">Loading employees...</p>
                    </td>
                  </tr>
                ) : currentEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        No employees found
                      </p>
                      <p className="text-gray-400 mt-2">
                        {searchTerm
                          ? "Try adjusting your search terms"
                          : "Get started by adding your first employee"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  currentEmployees.map((emp) => (
                    <tr
                      key={emp.employee_id}
                      className={`transition-colors hover:scale-[0.99] ${
                        isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                              isDarkMode
                                ? "bg-blue-900/20 text-blue-300"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {emp.full_name?.charAt(0) || "U"}
                          </div>
                          <span className="font-medium">{emp.full_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={emp.email ? "" : "text-gray-400"}>
                          {emp.email || "Not provided"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={emp.phone ? "" : "text-gray-400"}>
                          {emp.phone || "Not provided"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            emp.role_name === "manager"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                          }`}
                        >
                          {emp.role_name || "staff"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={emp.department_name ? "" : "text-gray-400"}
                        >
                          {emp.department_name || "Not assigned"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditEmployee(emp)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Edit employee"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(emp.employee_id, emp.full_name)
                            }
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete employee"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {currentEmployees.length > 0 && (
            <div
              className={`px-6 py-4 border-t ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800/50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, sortedEmployees.length)} of{" "}
                  {sortedEmployees.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-all ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition-all ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Add Employee Sheet */}
      {showAdd && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setShowAdd(false)}
          />

          {/* Sheet */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            {/* Background overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowAdd(false)}
            ></div>

            {/* Centered Sheet */}
            <div
              className={`relative w-full max-w-3xl h-full md:h-auto transform transition-transform duration-300 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } shadow-2xl rounded-lg`}
            >
              {/* Header */}
              <div
                className={`flex items-center justify-between p-6 border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Add New Employee
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill in the employee details
                  </p>
                </div>
                <button
                  onClick={() => setShowAdd(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <AddEmployee
                  onClose={() => setShowAdd(false)}
                  onSuccess={() => {
                    setShowAdd(false);
                    toast.success("Employee added successfully!");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Edit Employee Sheet */}
      {editEmployee && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setEditEmployee(null)}
          />

          {/* Sheet */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md">
            <div
              className={`h-full transform transition-transform duration-300 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } shadow-2xl`}
            >
              {/* Header */}
              <div
                className={`flex items-center justify-between p-6 border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Edit Employee
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Update employee details
                  </p>
                </div>
                <button
                  onClick={() => setEditEmployee(null)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="h-[calc(100%-80px)] overflow-y-auto">
                <EditEmployee
                  employee={editEmployee}
                  onClose={() => setEditEmployee(null)}
                  onSuccess={() => {
                    setEditEmployee(null);
                    toast.success("Employee updated successfully!");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
