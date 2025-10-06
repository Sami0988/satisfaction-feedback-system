import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import departmentSlice from "./slices/departmentSlice";
import departmentHeadSlice from "./slices/departmentHeadSlice";
import feedbackReducer from "./slices/feedbackSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    department: departmentSlice,
    departmentHead: departmentHeadSlice,
    feedback: feedbackReducer,
  },
});

export default store;
