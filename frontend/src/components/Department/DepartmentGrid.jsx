// src/components/Department/DepartmentGrid.jsx
import React from "react";
import DepartmentCard from "./DepartmentCard";

const DepartmentGrid = ({
  leftColumn,
  rightColumn,
  hoveredCard,
  setHoveredCard,
  setSelectedDept,
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-12">
      {/* Left Column */}
      <div className="flex-1 grid grid-cols-1 gap-6">
        {leftColumn.map((dept, index) => (
          <DepartmentCard
            key={dept.id}
            dept={dept}
            index={index}
            hoveredCard={hoveredCard}
            setHoveredCard={setHoveredCard}
            setSelectedDept={setSelectedDept}
          />
        ))}
      </div>

      {/* Spacer for the middle */}
      <div className="hidden lg:block w-16"></div>

      {/* Right Column */}
      <div className="flex-1 grid grid-cols-1 gap-6">
        {rightColumn.map((dept, index) => (
          <DepartmentCard
            key={dept.id}
            dept={dept}
            index={index + leftColumn.length}
            hoveredCard={hoveredCard}
            setHoveredCard={setHoveredCard}
            setSelectedDept={setSelectedDept}
          />
        ))}
      </div>
    </div>
  );
};

export default DepartmentGrid;
