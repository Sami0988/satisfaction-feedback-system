import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const FeedbackForm = ({ feedback, onSubmit, onClose }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    question_text: "",
    category: "UI/UX",
    type: "yes/no",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (feedback) {
      setFormData({
        question_text: feedback.question_text || "",
        category: feedback.category || "UI/UX",
        type: feedback.type || "yes/no",
      });
    }
  }, [feedback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.question_text.trim())
      newErrors.question_text = "Question is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!["scale", "yes/no", "open"].includes(formData.type))
      newErrors.type = "Type must be scale, yes/no, or open";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-bold">
            {feedback ? "Edit Question" : "Add New Question"}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`p-6 overflow-y-auto ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="space-y-6">
            {/* Question Text */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Question *
              </label>
              <input
                type="text"
                name="question_text"
                value={formData.question_text}
                onChange={handleChange}
                placeholder="Enter your question"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-blue-500 text-gray-100"
                    : "bg-white border-gray-300 focus:ring-blue-500 text-gray-900"
                }`}
                required
              />
              {errors.question_text && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.question_text}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-blue-500 text-gray-100"
                    : "bg-white border-gray-300 focus:ring-blue-500 text-gray-900"
                }`}
                required
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-blue-500 text-gray-100"
                    : "bg-white border-gray-300 focus:ring-blue-500 text-gray-900"
                }`}
                required
              >
                <option value="scale">Scale</option>
                <option value="yes/no">Yes/No</option>
                <option value="open">Open</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                isDarkMode
                  ? "text-gray-100 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              {feedback ? "Update Question" : "Create Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
