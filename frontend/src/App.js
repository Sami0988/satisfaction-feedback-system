import React, { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [satisfactionData] = useState({
    overallScore: 4.5,
    responses: 1284,
    trend: 'up',
    metrics: {
      responsiveness: 4.7,
      quality: 4.3,
      value: 4.2,
      support: 4.8
    },
    recentFeedback: [
      { id: 1, name: 'Sarah J.', rating: 5, comment: 'Excellent service! Will definitely use again.', date: '2 days ago' },
      { id: 2, name: 'Michael T.', rating: 4, comment: 'Good overall experience, but delivery was slightly delayed.', date: '3 days ago' },
      { id: 3, name: 'Emma L.', rating: 3, comment: 'Average experience. Product was good but customer service could be improved.', date: '5 days ago' },
      { id: 4, name: 'David K.', rating: 5, comment: 'Outstanding! Exceeded all my expectations.', date: '1 week ago' }
    ]
  });

  const renderRatingStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <header className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Customer Satisfaction</h1>
            <p className="text-gray-600">Track and analyze customer feedback</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search feedback..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200">
              <svg
                className="w-5 h-5 inline mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New Survey
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          {['overview', 'feedback', 'analytics', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium rounded-t-lg transition duration-200 ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Satisfaction Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{satisfactionData.overallScore}/5</div>
                <div className="text-gray-600">Overall Rating</div>
                <div className="mt-2">{renderRatingStars(Math.round(satisfactionData.overallScore))}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{satisfactionData.responses}</div>
                <div className="text-gray-600">Total Responses</div>
                <div className="mt-2 text-green-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  +12% from last month
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">92%</div>
                <div className="text-gray-600">Would Recommend</div>
                <div className="mt-2 text-purple-600">+4% from last month</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">78%</div>
                <div className="text-gray-600">Response Rate</div>
                <div className="mt-2 text-orange-600">+8% from last month</div>
              </div>
            </div>
          </div>

          {/* Feedback List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Feedback</h2>
            <div className="space-y-4">
              {satisfactionData.recentFeedback.map((feedback) => (
                <div key={feedback.id} className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{feedback.name}</h3>
                      <div className="mt-1">{renderRatingStars(feedback.rating)}</div>
                      <p className="text-gray-600 mt-2">{feedback.comment}</p>
                    </div>
                    <span className="text-sm text-gray-500">{feedback.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-2 text-center text-blue-600 hover:text-blue-800 font-medium transition duration-200">
              View All Feedback →
            </button>
          </div>
        </div>

        {/* Right Column - Metrics & Actions */}
        <div className="space-y-6">
          {/* Metrics */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Metrics</h2>
            {Object.entries(satisfactionData.metrics).map(([metric, score]) => (
              <div key={metric} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-700 capitalize">{metric}</span>
                  <span className="font-medium text-gray-800">{score}/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(score / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Satisfaction Chart Placeholder */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Satisfaction Trend</h2>
            <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">Visualization of satisfaction over time</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg transition duration-200 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Generate Report
              </button>
              <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg transition duration-200 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Customers
              </button>
              <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-4 rounded-lg transition duration-200 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Create Survey
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;