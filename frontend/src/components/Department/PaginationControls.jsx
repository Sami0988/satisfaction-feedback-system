import React from "react";

const PaginationControls = ({
  currentPage,
  totalPages,
  paginate,
  prevPage,
  nextPage,
  darkMode,
  startPage,
  endPage,
  pageNumbers,
}) => {
  return (
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

      {/* Show first page if not in initial range */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => paginate(1)}
            className={`px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600`}
          >
            1
          </button>
          {startPage > 2 && <span className="px-1">...</span>}
        </>
      )}

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

      {/* Show last page if not in current range */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-1">...</span>}
          <button
            onClick={() => paginate(totalPages)}
            className={`px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600`}
          >
            {totalPages}
          </button>
        </>
      )}

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
  );
};

export default PaginationControls;
