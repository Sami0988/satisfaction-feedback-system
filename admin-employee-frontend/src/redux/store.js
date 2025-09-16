import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import departmentSlice from "./slices/departmentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    department: departmentSlice,
  },
});

export default store;
