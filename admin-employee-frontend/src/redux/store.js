import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import departmentSlice from "./slices/departmentSlice";
import departmentHeadSlice from "./slices/departmentHeadSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    department: departmentSlice,
    departmentHead: departmentHeadSlice,
  },
});

export default store;
