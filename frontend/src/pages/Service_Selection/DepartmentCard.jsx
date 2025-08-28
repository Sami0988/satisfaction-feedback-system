import React from "react";
import { useNavigate } from "react-router-dom";

const DepartmentCard = ({ dept, index, hoveredCard, setHoveredCard }) => {
  const navigate = useNavigate();

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
      hover:shadow-2xl relative overflow-hidden
      bg-white text-black dark:from-gray-800 dark:to-gray-900 dark:bg-gradient-to-r dark:text-white`}
    >
      {/* Animated background element */}
      <div
        className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-black dark:bg-white opacity-10 ${
          hoveredCard === index ? "scale-150" : "scale-100"
        } transition-transform duration-300`}
      ></div>

      <div className="relative z-10">
        <div className="text-4xl mb-4">🏢</div>
        <h2 className="text-xl font-semibold mb-2">{dept.name}</h2>
        <p className="opacity-90 text-sm">
          {dept.description.substring(0, 60)}...
        </p>

        {/* Animated call to action */}
        <div
          className={`flex items-center mt-4 ${
            hoveredCard === index ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <span className="text-sm mr-2">Get this Service</span>
          <svg
            className="w-4 h-4"
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
    </div>
  );
};

export default DepartmentCard;
