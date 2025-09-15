import React, { useContext, useState } from "react";
import ThemeContext from "../../../context/ThemeContext";

const Reports = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [dateRange, setDateRange] = useState("lastMonth");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for feedback reports
  const feedbackData = {
    overview: {
      totalFeedback: 1247,
      responseRate: 78,
      averageRating: 4.2,
      feedbackBySource: [
        { name: "Web", value: 45, color: "#4F46E5" },
        { name: "Mobile", value: 30, color: "#10B981" },
        { name: "Email", value: 15, color: "#F59E0B" },
        { name: "In-Person", value: 10, color: "#EF4444" },
      ],
      trendData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [85, 92, 78, 95, 88, 97],
      },
    },
    sentiment: {
      positive: 65,
      neutral: 25,
      negative: 10,
      trend: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        positive: [60, 65, 62, 68, 70, 65],
        negative: [15, 12, 14, 10, 8, 10],
      },
    },
    categories: [
      {
        name: "Product Quality",
        feedbackCount: 324,
        positive: 70,
        negative: 30,
        trend: "up",
      },
      {
        name: "Customer Service",
        feedbackCount: 287,
        positive: 85,
        negative: 15,
        trend: "up",
      },
      {
        name: "Delivery Time",
        feedbackCount: 198,
        positive: 45,
        negative: 55,
        trend: "down",
      },
      {
        name: "Pricing",
        feedbackCount: 156,
        positive: 60,
        negative: 40,
        trend: "stable",
      },
      {
        name: "User Experience",
        feedbackCount: 132,
        positive: 75,
        negative: 25,
        trend: "up",
      },
    ],
    responseTimes: {
      average: "2.4 hours",
      distribution: [
        { range: "<1 hour", value: 25 },
        { range: "1-4 hours", value: 45 },
        { range: "4-12 hours", value: 20 },
        { range: ">12 hours", value: 10 },
      ],
    },
  };

  const renderOverviewTab = () => {
    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } shadow`}
          >
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Total Feedback
                </p>
                <p className="text-2xl font-bold">
                  {feedbackData.overview.totalFeedback}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } shadow`}
          >
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-green-100 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Response Rate
                </p>
                <p className="text-2xl font-bold">
                  {feedbackData.overview.responseRate}%
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } shadow`}
          >
            <div className="flex items-center">
              <div className="rounded-full p-2 bg-yellow-100 text-yellow-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Avg. Rating
                </p>
                <p className="text-2xl font-bold">
                  {feedbackData.overview.averageRating}/5
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Trend Chart */}
        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          } shadow`}
        >
          <h3
            className={`text-lg font-medium mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Feedback Volume Trend
          </h3>
          <div className="flex items-end h-40 space-x-2 pt-4">
            {feedbackData.overview.trendData.values.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-xs mb-1">{value}</div>
                <div
                  className="w-full bg-indigo-500 rounded-t"
                  style={{
                    height: `${(value / 100) * 80}%`,
                    maxWidth: "30px",
                  }}
                ></div>
                <div className="text-xs mt-1">
                  {feedbackData.overview.trendData.labels[index]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Sources */}
        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          } shadow`}
        >
          <h3
            className={`text-lg font-medium mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Feedback by Source
          </h3>
          <div className="flex items-center">
            <div className="w-1/2">
              <div className="relative w-40 h-40 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {
                    feedbackData.overview.feedbackBySource.reduce(
                      (acc, item, index, array) => {
                        const total = array.reduce(
                          (sum, i) => sum + i.value,
                          0
                        );
                        const startAngle = acc.angle;
                        const angle = (item.value / total) * 360;
                        const endAngle = startAngle + angle;
                        const largeArcFlag = angle <= 180 ? 0 : 1;

                        const start = polarToCartesian(50, 50, 45, startAngle);
                        const end = polarToCartesian(50, 50, 45, endAngle);

                        const pathData = [
                          `M 50 50`,
                          `L ${start.x} ${start.y}`,
                          `A 45 45 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
                          `Z`,
                        ].join(" ");

                        return {
                          angle: endAngle,
                          elements: [
                            ...acc.elements,
                            <path
                              key={index}
                              d={pathData}
                              fill={item.color}
                              stroke={isDarkMode ? "#374151" : "#FFFFFF"}
                              strokeWidth="1"
                            />,
                          ],
                        };
                      },
                      { angle: 0, elements: [] }
                    ).elements
                  }
                </svg>
              </div>
            </div>
            <div className="w-1/2">
              {feedbackData.overview.feedbackBySource.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSentimentTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-green-800" : "bg-green-50"
            } shadow`}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {feedbackData.sentiment.positive}%
              </div>
              <div className="text-sm font-medium">Positive</div>
            </div>
          </div>
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            } shadow`}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">
                {feedbackData.sentiment.neutral}%
              </div>
              <div className="text-sm font-medium">Neutral</div>
            </div>
          </div>
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-red-800" : "bg-red-50"
            } shadow`}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {feedbackData.sentiment.negative}%
              </div>
              <div className="text-sm font-medium">Negative</div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          } shadow`}
        >
          <h3
            className={`text-lg font-medium mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Sentiment Trend
          </h3>
          <div className="h-48 flex items-end space-x-1">
            {feedbackData.sentiment.trend.labels.map((label, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex items-end h-32">
                  <div
                    className="w-4 bg-green-500"
                    style={{
                      height: `${feedbackData.sentiment.trend.positive[index]}%`,
                    }}
                  ></div>
                  <div
                    className="w-4 bg-red-500 ml-1"
                    style={{
                      height: `${
                        feedbackData.sentiment.trend.negative[index] * 2
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs mt-2">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-1"></div>
              <span className="text-xs">Positive</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-1"></div>
              <span className="text-xs">Negative</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCategoriesTab = () => {
    return (
      <div className="space-y-4">
        {feedbackData.categories.map((category, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } shadow`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{category.name}</h3>
              <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {category.feedbackCount} feedbacks
              </span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${category.positive}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm w-12">
                {category.positive}% positive
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Positive: {category.positive}%</span>
              <span>Negative: {category.negative}%</span>
              <span
                className={`flex items-center ${
                  category.trend === "up"
                    ? "text-green-600"
                    : category.trend === "down"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {category.trend === "up" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                ) : category.trend === "down" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                ) : null}
                {category.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderResponseTimesTab = () => {
    return (
      <div className="space-y-6">
        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          } shadow`}
        >
          <h3
            className={`text-lg font-medium mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Average Response Time
          </h3>
          <div className="text-center py-6">
            <span className="text-4xl font-bold">
              {feedbackData.responseTimes.average}
            </span>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          } shadow`}
        >
          <h3
            className={`text-lg font-medium mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Response Time Distribution
          </h3>
          <div className="space-y-3">
            {feedbackData.responseTimes.distribution.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{item.range}</span>
                  <span className="text-sm">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <div
      className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Feedback Reports & Analytics
        </h2>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <select
            className={`px-3 py-2 rounded border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="lastYear">Last Year</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div
        className={`border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        } mb-6`}
      >
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", name: "Overview" },
            { id: "sentiment", name: "Sentiment" },
            { id: "categories", name: "Categories" },
            { id: "responseTimes", name: "Response Times" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? isDarkMode
                    ? "border-indigo-500 text-indigo-500"
                    : "border-indigo-600 text-indigo-600"
                  : isDarkMode
                  ? "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && renderOverviewTab()}
        {activeTab === "sentiment" && renderSentimentTab()}
        {activeTab === "categories" && renderCategoriesTab()}
        {activeTab === "responseTimes" && renderResponseTimesTab()}
      </div>
    </div>
  );
};

export default Reports;
