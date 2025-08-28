import React, { useState } from "react";
import data from "./Data/Department";

const DepartmentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDept, setSelectedDept] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Constants for pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.departments.length / itemsPerPage);
  
  // Get current departments for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDepartments = data.departments.slice(indexOfFirstItem, indexOfLastItem);
  
  // Split into left and right columns (4 each)
  const leftColumn = currentDepartments.slice(0, 4);
  const rightColumn = currentDepartments.slice(4, 8);
  
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
  
  // Handle card click
  const handleCardClick = (dept) => {
    setSelectedDept(dept);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Company Departments</h1>
        <p className="text-center text-gray-600 mb-10">Click on a department to Get Your Service</p>
        
        {/* Department Grid */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Left Column */}
          <div className="flex-1 grid grid-cols-1 gap-6">
            {leftColumn.map((dept, index) => (
              <DepartmentCard 
                key={dept.id}
                dept={dept}
                index={index}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                handleCardClick={handleCardClick}
              />
            ))}
          </div>
          
          {/* Right Column */}
          <div className="flex-1 grid grid-cols-1 gap-6">
            {rightColumn.map((dept, index) => (
              <DepartmentCard 
                key={dept.id}
                dept={dept}
                index={index + 4}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                handleCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
        
        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Previous
          </button>
          
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
        
        <p className="text-center text-gray-500 mt-4">
          Page {currentPage} of {totalPages} | Showing {currentDepartments.length} of {data.departments.length} departments
        </p>
      </div>

      {/* Modal for displaying department details */}
      {selectedDept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 transform scale-95 animate-scaleIn">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-3xl mr-3">🏢</span>
                <h2 className="text-2xl font-bold">{selectedDept.name}</h2>
              </div>
              <button onClick={closeModal} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <p className="text-gray-700 mb-4">
              {selectedDept.description}
            </p>
            
            <div className="bg-gray-100 p-4 rounded-xl mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Department Details:</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Code: {selectedDept.code}</li>
                <li>ID: {selectedDept.id}</li>
                <li>{selectedDept.parent_id ? `Sub-department of: ${selectedDept.parent_id}` : 'Main Department'}</li>
              </ul>
            </div>
            
            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Contact {selectedDept.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Department Card Component
const DepartmentCard = ({ dept, index, hoveredCard, setHoveredCard, handleCardClick }) => {
  // Assign different colors based on department ID for visual variety
  const colorClasses = [
    'bg-gradient-to-r from-blue-500 to-blue-700',
    'bg-gradient-to-r from-green-500 to-green-700',
    'bg-gradient-to-r from-purple-500 to-purple-700',
    'bg-gradient-to-r from-red-500 to-red-700',
    'bg-gradient-to-r from-yellow-500 to-yellow-700',
    'bg-gradient-to-r from-indigo-500 to-indigo-700',
    'bg-gradient-to-r from-pink-500 to-pink-700',
    'bg-gradient-to-r from-teal-500 to-teal-700'
  ];
  
  const colorIndex = parseInt(dept.id) % colorClasses.length;
  const colorClass = colorClasses[colorIndex];
  
  return (
    <div
      onClick={() => handleCardClick(dept)}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      className={`cursor-pointer ${colorClass} text-white shadow-xl rounded-2xl p-6 
      transition-all duration-300 transform ${hoveredCard === index ? 'scale-105' : 'scale-100'} 
      hover:shadow-2xl relative overflow-hidden`}
    >
      {/* Animated background element */}
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white opacity-10 ${hoveredCard === index ? 'scale-150' : 'scale-100'} transition-transform duration-300`}></div>
      
      <div className="relative z-10">
        <div className="text-4xl mb-4">🏢</div>
        <h2 className="text-xl font-semibold mb-2">{dept.name}</h2>
        <p className="opacity-90 text-sm">{dept.description.substring(0, 60)}...</p>
        
        {/* Animated call to action */}
        <div className={`flex items-center mt-4 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          <span className="text-sm mr-2">Learn more</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;