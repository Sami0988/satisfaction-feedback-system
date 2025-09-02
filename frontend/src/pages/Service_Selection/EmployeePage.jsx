import React, { useState, useEffect } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import logo from "../../asset/logo.jpg";
import { getEmployees } from "../../api/employee";
import { useParams } from "react-router-dom";

const EmployeePage = () => {
  const { darkMode } = useDarkMode();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { departmentId } = useParams();
  const { serviceId } = useParams();

  // Fetch employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        // You can pass departmentId and serviceId if needed
        console.log(departmentId, serviceId);
        const response = await getEmployees(1, 10, departmentId, serviceId);

        if (response.data && response.data.length > 0) {
          const employeeData = response.data[0];
          console.log("emlpyee Data is", employeeData);
          setEmployee({
            id: employeeData.employee_id,
            name: employeeData.full_name,
            department: "ICSIMIS",
            service:
              "Intern Database Administration for the Ethiopian Civil Service",
            floor: "6th Floor, To Left Side ISCIMIS Office",
            status: "pending",
            image:
              "data:image/jpeg;base64,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",

            email: employeeData.email,
            phone: employeeData.phone,
            hireDate: employeeData.hire_date,
          });
        } else {
          setError("No employees found");
        }
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  const handleAccept = () => {
    setEmployee((prev) => ({ ...prev, status: "accepted" }));
  };

  // Get today's date
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-800"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-800"
        }`}
      >
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-800"
        }`}
      >
        <div className="text-center">
          <p>No employee data available</p>
        </div>
      </div>
    );
  }

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
                  className="h-16 w-16 md:h-35 md:w-35 object-contain"
                  loading="eager"
                  fetchpriority="high"
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

                  {/* Additional employee info from API */}
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg mr-4 ${
                        darkMode ? "bg-gray-900" : "bg-gray-100"
                      }`}
                    >
                      <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Contact
                      </p>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {employee.email} • {employee.phone}
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
