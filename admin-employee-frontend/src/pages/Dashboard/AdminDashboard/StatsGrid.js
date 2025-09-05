// components/dashboard/StatsGrid.js
import React, { useContext } from "react";
import { adminDashboardData } from "../../../data/demodata";
import ThemeContext from "../../../context/ThemeContext";

const StatsGrid = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {adminDashboardData.stats.map((stat, index) => (
        <div
          key={index}
          className={`overflow-hidden shadow rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-2xl">{stat.icon}</div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt
                    className={`text-sm font-medium truncate ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {stat.title}
                  </dt>
                  <dd>
                    <div
                      className={`text-lg font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div
            className={`px-5 py-3 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
          >
            <div className="text-sm">
              <span
                className={`font-medium ${
                  stat.change.includes("+") ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>{" "}
              <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                from last week
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
