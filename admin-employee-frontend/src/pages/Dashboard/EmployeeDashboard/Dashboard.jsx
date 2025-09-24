import React, { useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { useSelector } from "react-redux";
import { employeeDashboardData } from "../../../data/demodata";

const Dashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useSelector((state) => state.auth);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1
        className={`text-2xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Welcome, {user?.name}
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {employeeDashboardData.stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5 flex items-center">
              <div className="text-2xl">{stat.icon}</div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.title}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <span
                  className={`font-medium ${
                    stat.change.includes("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  from last week
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
            Recent Tasks
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Your assigned tasks and their status
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {employeeDashboardData.tasks.map((task) => (
            <li
              key={task.id}
              className="px-4 py-4 flex justify-between items-center"
            >
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                  {task.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Due: {task.due}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status.replace("-", " ")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Dashboard;
