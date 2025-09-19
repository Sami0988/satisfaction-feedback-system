import { createSlice } from "@reduxjs/toolkit";
import {
  createDepartmentApi,
  getDepartmentsApi,
} from "../../api/superAdmin/createDepartmentApi";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  success: false,
  department: null,
  error: null,
  departments: [], // store all fetched departments
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    createStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    createSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.department = action.payload;
      state.error = null;
    },
    createFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.department = null;
      state.error = action.payload;
    },
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.departments = action.payload; // directly use backend response
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearDepartmentState: (state) => {
      state.loading = false;
      state.success = false;
      state.department = null;
      state.error = null;
    },
  },
});

export const {
  createStart,
  createSuccess,
  createFailure,
  fetchStart,
  fetchSuccess,
  fetchFailure,
  clearDepartmentState,
} = departmentSlice.actions;

// Thunks
export const createDepartment = (departmentData) => async (dispatch) => {
  dispatch(createStart());
  try {
    const res = await createDepartmentApi(departmentData);
    dispatch(createSuccess(res.data));
    toast.success("Department created successfully!");
  } catch (error) {
    console.error("Create department error:", error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to create department";
    dispatch(createFailure(message));
  }
};

export const fetchDepartments = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await getDepartmentsApi();
    console.log("Fetched departments response:", res.data);

    // Save employees array instead of whole response
    const employees = res.data.employees || [];
    dispatch(fetchSuccess(employees));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to fetch";
    dispatch(fetchFailure(message));
  }
};

export default departmentSlice.reducer;
