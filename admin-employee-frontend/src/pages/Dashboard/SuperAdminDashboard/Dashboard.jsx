import React, { useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";

const Dashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);

  // Demo data for the dashboard
  const dashboardStats = [
    { title: "Total Employees", value: 152, icon: "👥", change: "+12%" },
    { title: "Active Services", value: 23, icon: "🛠️", change: "+5%" },
    { title: "Pending Requests", value: 18, icon: "📋", change: "-3%" },
    { title: "System Health", value: "100%", icon: "❤️", change: "0%" },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "created a new service",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "System",
      action: "backup completed successfully",
      time: "5 hours ago",
    },
    {
      id: 3,
      user: "Jane Smith",
      action: "updated profile information",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        Dashboard Overview
      </h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.title}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-xs ${
                    stat.change.includes("+")
                      ? "text-green-500"
                      : stat.change.includes("-")
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change} from last week
                </p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div
        className={`p-6 rounded-lg shadow ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Recent Activities
        </h3>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className={`p-3 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <p
                className={isDarkMode ? "text-white" : "text-gray-900"}
              >
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {activity.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;