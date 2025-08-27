import React, { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import logo from "../../asset/logo.jpg";

const EmployeePage = () => {
  const { darkMode } = useDarkMode();

  // Single employee data
  const [employee, setEmployee] = useState({
    id: 1,
    name: "Samuel Zelalem",
    department: "ICSIMIS",
    service: "Intern Database Administration for the Ethiopian Civil Service",
    floor: "6th Floor,To Left Side ISCIMIS Office",
    status: "pending",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  });

  const handleAccept = () => {
    setEmployee({ ...employee, status: "accepted" });
  };

  // Get today's date
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Customer Message */}
          <div className="w-full lg:w-2/5 bg-gradient-to-br from-blue-400 to-indigo-700 text-white p-8 flex flex-col justify-center">
            {/* Logo container - centered at the top with larger size */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-3 rounded-full shadow-lg">
                
                <img
                  src={logo}
                  alt="Logo"
                  className="h-6 w-6 object-contain"
                  loading="eager" // loads immediately
                  fetchpriority="high" // tells browser to fetch first
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Welcome to Our Service
              </h2>
              <div className="w-20 h-1 bg-blue-300 mb-6 mx-auto"></div>
              <p className="text-lg mb-4">
                Dear Customer, this is the employee who can help you with your
                service needs.
              </p>
              <p className="text-lg mb-4">
                Please click the Accept button to confirm and find the employee
                at the address provided.
              </p>
              <p className="text-lg font-semibold">
                Don't forget to give feedback when you finish your service!
              </p>
            </div>

            <div className="mt-8 flex items-center text-blue-200">
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
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>We value your satisfaction and feedback</span>
            </div>
          </div>

          {/* Right Side - Employee Card */}
          <div className="w-full lg:w-3/5 flex items-center justify-center p-8">
            <div
              className={`w-full max-w-md rounded-2xl shadow-lg overflow-hidden transition-colors duration-300 ${
                darkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              {/* Employee Header with Image */}
              <div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover absolute left-1/2 transform -translate-x-1/2 -bottom-16 shadow-lg"
                />
              </div>

              {/* Employee Details */}
              <div className="pt-20 px-6 pb-6">
                <h1
                  className={`text-2xl font-bold text-center mb-1 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {employee.name}
                </h1>
                <p className="text-center text-indigo-400 font-medium mb-6">
                  {employee.department} Department
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg mr-4 ${
                        darkMode ? "bg-blue-900" : "bg-blue-100"
                      }`}
                    >
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Service
                      </p>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {employee.service}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg mr-4 ${
                        darkMode ? "bg-green-900" : "bg-green-100"
                      }`}
                    >
                      <svg
                        className="w-6 h-6 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Floor & Room
                      </p>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {employee.floor}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg mr-4 ${
                        darkMode ? "bg-purple-900" : "bg-purple-100"
                      }`}
                    >
                      <svg
                        className="w-6 h-6 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Date
                      </p>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {today}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accept Button */}
                <button
                  onClick={handleAccept}
                  disabled={employee.status === "accepted"}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                    employee.status === "accepted"
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  }`}
                >
                  {employee.status === "accepted"
                    ? "Service Confirmed"
                    : "Accept Service"}
                </button>

                {/* Feedback Note */}
                <div
                  className={`mt-6 text-center text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <p>
                    After your service, please provide feedback at the reception
                    desk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
