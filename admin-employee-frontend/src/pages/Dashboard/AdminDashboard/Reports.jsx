// components/reports/Reports.js
import React, { useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";

const Reports = () => {
  const { isDarkMode } = useContext(ThemeContext);

  // Sample data for charts
  const revenueData = [
    { month: "Jan", revenue: 10000 },
    { month: "Feb", revenue: 12000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 18000 },
    { month: "May", revenue: 20000 },
    { month: "Jun", revenue: 24000 },
  ];

  const serviceUsage = [
    { name: "Web Development", value: 35 },
    { name: "Graphic Design", value: 25 },
    { name: "Content Writing", value: 20 },
    { name: "SEO Optimization", value: 15 },
    { name: "Consulting", value: 5 },
  ];

  return (
    <div
      className={`rounded-lg shadow ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } p-6`}
    >
      <h2 className="text-xl font-bold mb-6">Reports & Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <h3 className="text-lg font-medium mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-end space-x-2">
            {revenueData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-indigo-500 rounded-t hover:bg-indigo-600 transition-colors"
                  style={{ height: `${(item.revenue / 25000) * 100}%` }}
                ></div>
                <div className="text-xs mt-2 text-gray-500">{item.month}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <h3 className="text-lg font-medium mb-4">Service Usage</h3>
          <div className="h-64 flex flex-col justify-center">
            {serviceUsage.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.value}%
                  </span>
                </div>
                <div
                  className={`w-full h-2 rounded-full ${
                    isDarkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`p-4 rounded-lg ${
          isDarkMode ? "bg-gray-700" : "bg-gray-50"
        }`}
      >
        <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode
                      ? "text-gray-300 bg-gray-600"
                      : "text-gray-500 bg-gray-100"
                  }`}
                >
                  Date
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode
                      ? "text-gray-300 bg-gray-600"
                      : "text-gray-500 bg-gray-100"
                  }`}
                >
                  Client
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode
                      ? "text-gray-300 bg-gray-600"
                      : "text-gray-500 bg-gray-100"
                  }`}
                >
                  Service
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode
                      ? "text-gray-300 bg-gray-600"
                      : "text-gray-500 bg-gray-100"
                  }`}
                >
                  Amount
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDarkMode
                      ? "text-gray-300 bg-gray-600"
                      : "text-gray-500 bg-gray-100"
                  }`}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y divide-gray-200 dark:divide-gray-700 ${
                isDarkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              {[
                {
                  id: 1,
                  date: "2023-06-15",
                  client: "ABC Company",
                  service: "Web Development",
                  amount: "$2,500",
                  status: "Completed",
                },
                {
                  id: 2,
                  date: "2023-06-14",
                  client: "XYZ Corp",
                  service: "SEO Optimization",
                  amount: "$1,200",
                  status: "Pending",
                },
                {
                  id: 3,
                  date: "2023-06-12",
                  client: "John Smith",
                  service: "Content Writing",
                  amount: "$800",
                  status: "Completed",
                },
                {
                  id: 4,
                  date: "2023-06-10",
                  client: "Jane Doe",
                  service: "Graphic Design",
                  amount: "$1,500",
                  status: "Completed",
                },
              ].map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {transaction.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
