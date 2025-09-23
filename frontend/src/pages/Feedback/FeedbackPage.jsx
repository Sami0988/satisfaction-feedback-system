// frontend/src/pages/FeedbackPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { getDepartmentWithAdmin } from "../../api/department";

const FeedbackPage = () => {
  const { departmentId } = useParams();
  const { darkMode } = useDarkMode();
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const result = await getDepartmentWithAdmin(departmentId);
        setEntity(result.data);
      } catch (err) {
        console.error("Error fetching department info:", err);
        setEntity(null);
      } finally {
        setLoading(false);
      }
    };

    if (departmentId) {
      fetchEntity();
    } else {
      setLoading(false);
    }
  }, [departmentId]);

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={darkMode ? "text-white" : "text-gray-900"}>
            Loading feedback form...
          </p>
        </div>
      </div>
    );
  }

  // Entity not found state
  if (!entity) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-xl text-center ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-2xl font-bold mb-2">Department Not Found</h2>
          <p className="mb-4">
            The department you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  // Extract data from the entity object
  const departmentName = entity.name || "Department";
  const adminName = entity.admin?.full_name || "Admin";
  const adminEmail = entity.admin?.email || "No email";
  const departmentEmail = entity.email || "No department email";
  const departmentPhone = entity.phone || "No phone";
  const departmentFloor = entity.floor ? `Floor ${entity.floor}` : "";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Card */}
        <div
          className={`rounded-3xl shadow-2xl overflow-hidden ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
              : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"
          }`}
        >
          {/* Top color strip - KEPT THIS */}
          <div
            className={`h-2 ${darkMode ? "bg-blue-500" : "bg-indigo-500"}`}
          ></div>

          <div className="p-8">
            {/* Header Section */}
            <div className="text-center mb-6">
              <h1
                className={`text-3xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ECSC Customer Feedback
              </h1>

              {/* Horizontal separator line */}
              <div
                className={`h-px w-full mb-6 ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
              ></div>
            </div>

            {/* Department and Admin Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Department Details */}
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {departmentName}
                </h2>
                <div className="space-y-2">
                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{departmentFloor}</span>
                  </div>

                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{departmentEmail}</span>
                  </div>

                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>{departmentPhone}</span>
                  </div>
                </div>
              </div>

              {/* Admin Details */}
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <h3
                  className={`font-semibold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Department Admin
                </h3>
                <div className="space-y-2">
                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{adminName}</span>
                  </div>

                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{adminEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Card */}
        <div
          className={`mt-8 p-6 rounded-2xl shadow-xl transition-all duration-300 ${
            darkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <h3
            className={`text-xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Submit Your Feedback
          </h3>
        </div>

        {/* Footer */}
        <div
          className={`mt-8 p-4 rounded-lg text-center ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <strong>ESCS © 2025GC/2016:</strong> ICSMIS DEVELOPED BY ICSMIS
            INTERNS
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
