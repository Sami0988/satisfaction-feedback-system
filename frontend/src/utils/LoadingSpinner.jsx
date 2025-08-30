import React, { useState, useEffect } from "react";

const LoadingSpinner = ({
  height = "h-64",
  size = "h-12 w-12",
  borderColor = "border-blue-500",
  spinnerType = "pulse", // pulse, double, chase, dots, flip, ring
  message = "Loading...",
}) => {
  // Pulse spinner (default)
  const PulseSpinner = () => (
    <div
      className={`animate-pulse rounded-full ${size} ${borderColor} bg-gradient-to-r from-blue-500 to-purple-600`}
    ></div>
  );

  // Double spinner
  const DoubleSpinner = () => (
    <div className="relative">
      <div
        className={`animate-spin rounded-full ${size} border-t-2 border-b-2 ${borderColor}`}
      ></div>
      <div
        className={`animate-spin animation-delay-1000 absolute top-0 left-0 rounded-full ${size} border-r-2 border-l-2 border-green-500`}
      ></div>
    </div>
  );

  // Chase spinner
  const ChaseSpinner = () => (
    <div className={`${size} relative`}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-full animate-chase-spinner opacity-0"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div
            className={`w-1/3 h-1/3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500`}
          ></div>
        </div>
      ))}
    </div>
  );

  // Dots spinner
  const DotsSpinner = () => (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`animate-bounce rounded-full bg-gradient-to-r from-blue-500 to-purple-600`}
          style={{
            width: "10px",
            height: "10px",
            animationDelay: `${i * 0.1}s`,
          }}
        ></div>
      ))}
    </div>
  );

  // Flip spinner
  const FlipSpinner = () => (
    <div
      className={`animate-flip ${size} bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg`}
    ></div>
  );

  // Ring spinner
  const RingSpinner = () => (
    <div className="relative">
      <div
        className={`${size} rounded-full absolute border-4 border-gray-200`}
      ></div>
      <div
        className={`${size} rounded-full animate-spin border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-green-500`}
      ></div>
    </div>
  );

  // Select spinner based on type
  const renderSpinner = () => {
    switch (spinnerType) {
      case "double":
        return <DoubleSpinner />;
      case "chase":
        return <ChaseSpinner />;
      case "dots":
        return <DotsSpinner />;
      case "flip":
        return <FlipSpinner />;
      case "ring":
        return <RingSpinner />;
      default:
        return <PulseSpinner />;
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center ${height} space-y-4`}
    >
      {renderSpinner()}
      {message && <p className="text-gray-600 animate-pulse">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
