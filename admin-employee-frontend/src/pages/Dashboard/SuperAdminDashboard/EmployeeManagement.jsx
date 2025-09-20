import React, { useContext, useEffect, useState, useMemo } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  createDepartment,
  deleteDepartment,
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

  // Fetch departments on mount
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Filter departments
  const filteredDepartments = useMemo(() => {
    if (!departments || departments.length === 0) return [];
    return departments.filter(
      (dept) =>
        dept.adminFullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.adminEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.adminPhone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.departmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.departmentEmail
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        dept.floor?.toString().includes(searchTerm)
    );
  }, [departments, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDepartments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleAddDepartment = async (departmentData) => {
    try {
      await dispatch(createDepartment(departmentData));
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

  const handleUpdateAdmin = () => {
    setSelectedAdmin(null);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedAdmin) {
      dispatch(deleteDepartment(selectedAdmin.department_id));
    }
    setSelectedAdmin(null);
    setIsDeleteModalOpen(false);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) endPage = 4;
      else if (currentPage >= totalPages - 2) startPage = totalPages - 3;

      if (startPage > 2) pageNumbers.push("...");
      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
      if (endPage < totalPages - 1) pageNumbers.push("...");

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
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Add Department
          </button>
        </div>

        {/* Search & items per page */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={`w-full sm:w-64 p-3 pl-10 rounded-lg border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
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
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
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

        {/* Table */}
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
                <th className="px-4 py-3 text-left">Department Name</th>
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
                    key={admin.department_id}
                    className={
                      isDarkMode
                        ? "border-b border-gray-700 hover:bg-gray-700/50"
                        : "border-b border-gray-200 hover:bg-gray-50"
                    }
                  >
                    <td
                      className={
                        isDarkMode
                          ? "text-white px-4 py-3"
                          : "text-gray-900 px-4 py-3"
                      }
                    >
                      {admin.adminFullName}
                    </td>
                    <td
                      className={
                        isDarkMode
                          ? "text-white px-4 py-3"
                          : "text-gray-900 px-4 py-3"
                      }
                    >
                      {admin.adminEmail}
                    </td>
                    <td
                      className={
                        isDarkMode
                          ? "text-white px-4 py-3"
                          : "text-gray-900 px-4 py-3"
                      }
                    >
                      {admin.adminPhone}
                    </td>
                    <td
                      className={
                        isDarkMode
                          ? "text-white px-4 py-3"
                          : "text-gray-900 px-4 py-3"
                      }
                    >
                      {admin.departmentName || "-"}
                    </td>
                    <td
                      className={
                        isDarkMode
                          ? "text-white px-4 py-3"
                          : "text-gray-900 px-4 py-3"
                      }
                    >
                      {admin.departmentEmail || "-"}
                    </td>
                    <td
                      className={
                        isDarkMode
                          ? "text-white px-4 py-3"
                          : "text-gray-900 px-4 py-3"
                      }
                    >
                      {admin.floor || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          admin.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {admin.status}
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

        {/* Pagination */}
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
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Previous
              </button>
              {getPageNumbers().map((number, idx) =>
                number === "..." ? (
                  <span
                    key={idx}
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
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Next
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
