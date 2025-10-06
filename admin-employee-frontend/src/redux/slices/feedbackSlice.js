import { createSlice } from "@reduxjs/toolkit";
import {
  getFeedbacksApi,
  addFeedbackApi,
  updateFeedbackApi,
  deleteFeedbackApi,
} from "../../api/DepartmentHead/feedbackApi";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  feedbacks: [],
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    actionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    actionSuccess: (state) => {
      state.loading = false;
    },
    actionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
      state.loading = false;
    },
  },
});

export const { actionStart, actionSuccess, actionFailure, setFeedbacks } =
  feedbackSlice.actions;

// ✅ Thunk: Fetch all feedbacks
export const fetchFeedbacks = () => async (dispatch) => {
  dispatch(actionStart());
  try {
    const res = await getFeedbacksApi();
    dispatch(setFeedbacks(res.data));
    console.log("Fetched feedbacks:", res.data);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(actionFailure(message));
    toast.error(message);
  }
};

// ✅ Thunk: Add feedback
export const addFeedback = (feedbackData) => async (dispatch) => {
  dispatch(actionStart());
  try {
    await addFeedbackApi(feedbackData);
    console.log("Added feedback:", feedbackData);
    toast.success("Feedback added successfully!");
    dispatch(fetchFeedbacks()); // refresh list
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(actionFailure(message));
    toast.error(message);
  }
};

// ✅ Thunk: Delete feedback
export const deleteFeedback = (id) => async (dispatch) => {
  dispatch(actionStart());
  try {
    await deleteFeedbackApi(id);
    toast.success("Feedback deleted!");
    dispatch(fetchFeedbacks());
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(actionFailure(message));
    toast.error(message);
  }
};

// ✅ Thunk: Update feedback
export const updateFeedback = (id, feedbackData) => async (dispatch) => {
  dispatch(actionStart());
  try {
    await updateFeedbackApi(id, feedbackData);
    toast.success("Feedback updated!");
    dispatch(fetchFeedbacks());
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(actionFailure(message));
    toast.error(message);
  }
};

export default feedbackSlice.reducer;
