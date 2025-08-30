import React from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

const DepartmentCard = ({ dept, index, hoveredCard, setHoveredCard }) => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const handleClick = () => {
    navigate(`/service`);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      className={`cursor-pointer shadow-xl rounded-2xl p-6 
      transition-all duration-300 transform hover:scale-105 
      hover:shadow-2xl relative overflow-hidden group
      ${
        darkMode
          ? "bg-gray-800 border border-gray-700 text-white"
          : "bg-white border border-gray-200 text-gray-800"
      }`}
    >
      {/* Animated background element */}
      <div
        className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${
          darkMode ? "bg-white" : "bg-gray-800"
        } opacity-5 ${
          hoveredCard === index ? "scale-150" : "scale-100"
        } transition-transform duration-300`}
      ></div>

      <div className="relative z-10">
        {/* Department header with code */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">{dept.name}</h2>
        </div>

        {/* Department description */}
        {dept.description && (
          <p
            className={`text-sm mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {dept.description.length > 60
              ? `${dept.description.substring(0, 60)}...`
              : dept.description}
          </p>
        )}

        {/* Contact info */}
        <div className="space-y-1 mb-4">
          {dept.email && (
            <div
              className={`text-xs flex items-center ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span className="mr-2">✉️</span>
              <span className="truncate">{dept.email}</span>
            </div>
          )}
          {dept.phone && (
            <div
              className={`text-xs flex items-center ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span className="mr-2">📞</span>
              <span>{dept.phone}</span>
            </div>
          )}
        </div>

        {/* Animated call to action */}
        <div
          className={`flex items-center justify-between mt-4 pt-3 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } ${
            hoveredCard === index
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4"
          } transition-all duration-300`}
        >
          <span className="text-sm font-medium">View Services</span>
          <svg
            className={`w-4 h-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>

        {/* Static call to action (visible when not hovered) */}
        <div
          className={`flex items-center justify-between mt-4 pt-3 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } ${
            hoveredCard === index
              ? "opacity-0 -translate-x-4"
              : "opacity-100 translate-x-0"
          } transition-all duration-300 absolute bottom-4 left-6 right-6`}
        >
          <span
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Click for details
          </span>
          <svg
            className={`w-3 h-3 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </div>

      {/* Hover effect border */}
      <div
        className={`absolute inset-0 rounded-2xl border-2 ${
          darkMode ? "border-gray-600" : "border-gray-300"
        } ${
          hoveredCard === index ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      ></div>
    </div>
  );
};

export default React.memo(DepartmentCard, (prev, next) => {
  return prev.dept === next.dept && prev.hoveredCard === next.hoveredCard;
});
