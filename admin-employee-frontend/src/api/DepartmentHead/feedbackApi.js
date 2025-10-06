// src/api/feedbackApi.js
import API from "../index"; // your shared Axios instance

const FEEDBACK_URL = "/super-admin/feedback";

// ✅ Get all feedbacks
export const getFeedbacksApi = () => {
  return API.get(FEEDBACK_URL);
};

// ✅ Add new feedback (optional, if you need it later)
export const addFeedbackApi = (feedbackData) => {
  return API.post(FEEDBACK_URL, feedbackData);
};

// ✅ Update feedback
export const updateFeedbackApi = (id, feedbackData) => {
  return API.put(`${FEEDBACK_URL}/${id}`, feedbackData);
};

// ✅ Delete feedback
export const deleteFeedbackApi = (id) => {
  return API.delete(`${FEEDBACK_URL}/${id}`);
};
