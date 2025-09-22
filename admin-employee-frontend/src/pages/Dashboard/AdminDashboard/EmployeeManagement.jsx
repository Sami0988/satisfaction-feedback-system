import React, { useEffect, useContext, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ThemeContext from "../../../context/ThemeContext";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee"; // Import the EditEmployee component
import DeleteConfirmation from "../../../components/DeleteConfirmation";
import {
  fetchDepartmentData,
  deleteEmployeeOrService,
  updateEmployee, // Make sure to import this action
} from "../../../redux/slices/departmentHeadSlice";
import { toast } from "react-toastify";

const EmployeeManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const {
    employees = [],
    loading,
    error,
  } = useSelector((state) => state.departmentHead);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New state for edit modal
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Delete confirmation modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(fetchDepartmentData());
  }, [dispatch]);

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsEditModalOpen(true); // Open the edit modal instead of the sheet
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditingEmployee(null);
    toast.success("Employee updated successfully!");
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await dispatch(
        deleteEmployeeOrService("employee", deleteTarget.employee_id)
      ).unwrap();
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete employee");
    } finally {
      setIsDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;
    return employees.filter(
      (emp) =>
        emp.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.phone?.includes(searchTerm) ||
        emp.role_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.service?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.service?.category
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        emp.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const hasEmployees = Array.isArray(employees) && employees.length > 0;

  if (loading) {
    return (
      <div
        className={`rounded-lg shadow ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-6`}
      >
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-3">Loading employees...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`rounded-lg shadow ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-6`}
      >
        <div className="text-center text-red-500 py-8">
          Error loading employees: {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg shadow ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } p-6`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Employee Management</h2>
        <button
          onClick={() => {
            setEditingEmployee(null);
            setIsSheetOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span> Add Employee
        </button>
      </div>

      {/* Search & Items per page */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div className="flex items-center gap-4">
          <label
            className={`mr-2 text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Show:
          </label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className={`px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Add Employee Sheet */}
      {isSheetOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setIsSheetOpen(false);
              setEditingEmployee(null);
            }}
          ></div>

          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 shadow-xl p-8 overflow-y-auto rounded-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold">
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </h3>
              <button
                onClick={() => {
                  setIsSheetOpen(false);
                  setEditingEmployee(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <AddEmployee
              onSuccess={() => {
                setIsSheetOpen(false);
                setEditingEmployee(null);
              }}
              editingEmployee={editingEmployee}
            />
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && (
        <EditEmployee
          employee={editingEmployee}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingEmployee(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* Employee Table */}
      <div className="overflow-x-auto">
        {!hasEmployees ? (
          <div className="text-center py-8 text-gray-500">
            No employees found. Add your first employee to get started.
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No employees match your search criteria.
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Role & Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedEmployees.map((emp) => (
                  <tr
                    key={emp.employee_id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {/* Employee Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              emp.full_name || ""
                            )}&background=random`}
                            alt={emp.full_name || "Employee"}
                          />
                        </div>
                        <div className="ml-4">
                          <div
                            className={`text-sm font-medium ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {emp.full_name || "Unknown"}
                          </div>
                          <div
                            className={`text-xs ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            ID: {emp.employee_id || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="px-6 py-4">
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <div className="font-medium">
                          {emp.email || "No email"}
                        </div>
                        <div>{emp.phone || "No phone"}</div>
                      </div>
                    </td>

                    {/* Role & Department */}
                    <td className="px-6 py-4">
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-1 dark:bg-blue-900 dark:text-blue-200">
                          {emp.role_name || "No role"}
                        </span>
                        <div className="mt-1 text-xs">
                          {emp.department_name || "No department"}
                        </div>
                      </div>
                    </td>

                    {/* Service Info */}
                    <td className="px-6 py-4">
                      {emp.service ? (
                        <div>
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-1 dark:bg-green-900 dark:text-green-200">
                            {emp.service.name || "Unnamed service"}
                          </span>
                          <div
                            className={`text-xs ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {emp.service.category || "No category"}
                          </div>
                        </div>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          No Service Assigned
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          emp.active
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {emp.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditEmployee(emp)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          title="Edit Employee"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setDeleteTarget(emp);
                            setIsDeleteOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete Employee"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  } mb-4 sm:mb-0`}
                >
                  Showing {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredEmployees.length
                  )}{" "}
                  of {filteredEmployees.length} results
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-indigo-600 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-indigo-900"
                    }`}
                  >
                    Previous
                  </button>

                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof page === "number" ? handlePageChange(page) : null
                      }
                      disabled={page === "..."}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        page === currentPage
                          ? "bg-indigo-600 text-white"
                          : page === "..."
                          ? "text-gray-500 cursor-default"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-indigo-600 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-indigo-900"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {hasEmployees && filteredEmployees.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {paginatedEmployees.length} of {filteredEmployees.length}{" "}
          filtered employees
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
        admin={deleteTarget?.full_name || "this employee"}
      />
    </div>
  );
};

export default EmployeeManagement;
