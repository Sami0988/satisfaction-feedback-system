import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeedbacks,
  deleteFeedback,
  addFeedback,
} from "../redux/slices/feedbackSlice";
import ThemeContext from "../context/ThemeContext";
import FeedbackForm from "./FeedbackForm";

const FeedbackList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { feedbacks, loading, error } = useSelector((state) => state.feedback);
  const { isDarkMode } = useContext(ThemeContext);

  const [showForm, setShowForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      dispatch(deleteFeedback(id));
    }
  };

  const handleAdd = () => {
    setEditingFeedback(null);
    setShowForm(true);
  };

  const handleEdit = (feedback) => {
    setEditingFeedback(feedback);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingFeedback(null);
  };

  const handleSubmitForm = (data) => {
    dispatch(addFeedback(data));

    setShowForm(false);
    setEditingFeedback(null);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-green-100 text-green-800";
    if (rating >= 3) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "UI/UX": "bg-purple-100 text-purple-800",
      Performance: "bg-orange-100 text-orange-800",
      Feature: "bg-blue-100 text-blue-800",
      Bug: "bg-red-100 text-red-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors["Other"];
  };

  return (
    <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}>
      {/* Header with Add Question Button - Always Visible */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4">
        <div>
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Feedback Questions
          </h1>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            {feedbacks.length > 0
              ? `${feedbacks.length} question${
                  feedbacks.length !== 1 ? "s" : ""
                } found`
              : "No questions yet"}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-md"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Question
        </button>
      </div>

      {/* Feedback Form Modal */}
      {showForm && (
        <FeedbackForm
          feedback={editingFeedback}
          onSubmit={handleSubmitForm}
          onClose={handleCloseForm}
        />
      )}

      {/* Loading State */}
      {loading && (
        <div
          className={`text-center p-8 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading feedback questions...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-4 mb-6">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600">Failed to load feedback: {error}</p>
          </div>
        </div>
      )}

      {/* No Feedback Found - Enhanced Empty State */}
      {!loading && !error && feedbacks.length === 0 && (
        <div
          className={`rounded-xl shadow-sm p-12 text-center mx-4 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border`}
        >
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3
            className={`text-xl font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            No feedback questions yet
          </h3>
          <p
            className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Get started by creating your first feedback question to collect
            valuable insights.
          </p>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Your First Question
          </button>
        </div>
      )}

      {/* Feedback List */}
      {!loading && !error && feedbacks.length > 0 && (
        <div className="space-y-4 px-4">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3
                      className={`text-xl font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {feedback.title || feedback.question}
                    </h3>
                    {feedback.rating && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
                          feedback.rating
                        )}`}
                      >
                        {feedback.rating}/5 ★
                      </span>
                    )}
                    {feedback.category && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                          feedback.category
                        )}`}
                      >
                        {feedback.category}
                      </span>
                    )}
                  </div>

                  <p
                    className={`mb-4 leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {feedback.message || feedback.description}
                  </p>

                  {/* Additional feedback metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    {feedback.author && (
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {feedback.author}
                      </span>
                    )}
                    {feedback.createdAt && (
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(feedback)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                      isDarkMode
                        ? "text-blue-400 hover:bg-blue-900"
                        : "text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feedback._id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                      isDarkMode
                        ? "text-red-400 hover:bg-red-900"
                        : "text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
