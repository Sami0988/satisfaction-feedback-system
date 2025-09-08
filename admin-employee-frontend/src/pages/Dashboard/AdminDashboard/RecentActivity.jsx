// components/dashboard/RecentActivity.js
import React, { useContext } from "react";
import { adminDashboardData } from "../../../data/demodata";
import ThemeContext from "../../../context/ThemeContext";

const RecentActivity = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`shadow sm:rounded-lg ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div
        className={`px-4 py-5 sm:px-6 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h3
          className={`text-lg leading-6 font-medium ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Recent Activity
        </h3>
        <p
          className={`mt-1 max-w-2xl text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          System activities and events
        </p>
      </div>
      <ul
        className={`divide-y ${
          isDarkMode ? "divide-gray-700" : "divide-gray-200"
        }`}
      >
        {adminDashboardData.recentActivities.map((activity) => (
          <li key={activity.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {activity.description}
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {activity.time}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
