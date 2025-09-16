import React, { useContext, useEffect, useState, useMemo } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  createDepartment,
} from "../../../redux/slices/departmentSlice";
import AddDepartmentForm from "./AddDepartmentForm";
import EditDepartmentAdmin from "./EditDepartmentAdmin";
import DeleteConfirmation from "../../../components/DeleteConfirmation";
import { toast } from "react-toastify";

const EmployeeManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { departments, loading, error } = useSelector(
    (state) => state.department
  );

  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Filter departments based on search term
  const filteredDepartments = useMemo(() => {
    if (!departments) return [];

    return departments.filter(
      (dept) =>
        dept.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.department?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        dept.department?.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        dept.department?.floor?.toString().includes(searchTerm)
    );
  }, [departments, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDepartments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleAddDepartment = async (departmentData) => {
    try {
      await dispatch(createDepartment(departmentData)).unwrap();
      await dispatch(fetchDepartments()); // refresh list

      setIsAddDepartmentOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to create department");
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleDelete = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateAdmin = (updatedAdminData) => {
    setSelectedAdmin(null);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setSelectedAdmin(null);
    setIsDeleteModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // If total pages is less than max visible, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (loading) return <p className="p-6">Loading departments...</p>;

  return (
    <>
      <div
        className={`p-6 rounded-lg shadow ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Department Admin Management
          </h2>
          <button
            onClick={() => setIsAddDepartmentOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Add Department
          </button>
        </div>

        {/* Search and items per page controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`w-full p-3 pl-10 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              } focus:outline-none focus:ring-2`}
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
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

          <div className="flex items-center gap-2">
            <label
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Show:
            </label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className={`p-2 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              } focus:outline-none focus:ring-1`}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              entries
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full">
            <thead>
              <tr
                className={
                  isDarkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-600"
                }
              >
                <th className="px-4 py-3 text-left">Admin Name</th>
                <th className="px-4 py-3 text-left">Admin Email</th>
                <th className="px-4 py-3 text-left">Admin Phone</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Department Email</th>
                <th className="px-4 py-3 text-left">Floor</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((admin) => (
                  <tr
                    key={admin.employee_id}
                    className={
                      isDarkMode
                        ? "border-b border-gray-700 hover:bg-gray-700/50"
                        : "border-b border-gray-200 hover:bg-gray-50"
                    }
                  >
                    <td
                      className={`px-4 py-3 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {admin.full_name}
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {admin.email}
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {admin.phone}
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {admin.department?.name || "-"}
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {admin.department?.email || "-"}
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {admin.department?.floor || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          admin.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {admin.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(admin)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className={`text-center py-8 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {searchTerm
                      ? "No matching departments found."
                      : "No departments found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination controls */}
        {filteredDepartments.length > 0 && (
          <div
            className={`flex flex-col sm:flex-row items-center justify-between mt-6 p-4 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            } rounded-lg`}
          >
            <div
              className={`text-sm mb-4 sm:mb-0 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Showing{" "}
              <span className="font-semibold">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-semibold">
                {Math.min(indexOfLastItem, filteredDepartments.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold">
                {filteredDepartments.length}
              </span>{" "}
              entries
              {searchTerm && (
                <span> (filtered from {departments.length} total entries)</span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              {/* Page numbers with ellipsis */}
              <div className="hidden sm:flex space-x-1">
                {getPageNumbers().map((number, index) =>
                  number === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className={`px-3 py-2 rounded-md ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === number
                          ? "bg-indigo-600 text-white"
                          : isDarkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Next
                <svg
                  className="w-5 h-5 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
        )}
      </div>

      <AddDepartmentForm
        isOpen={isAddDepartmentOpen}
        onClose={() => setIsAddDepartmentOpen(false)}
        onSave={handleAddDepartment}
      />

      <EditDepartmentAdmin
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateAdmin}
        admin={selectedAdmin}
      />

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        admin={selectedAdmin}
      />
    </>
  );
};

export default EmployeeManagement;
