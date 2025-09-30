// admin-employee-frontend/src/redux/slices/departmentHeadSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addEmployeeApi,
  addServiceApi,
  getDepartmentDataApi,
} from "../../api/DepartmentHead/departmentHeadApi";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  success: false,
  error: null,
  employees: [],
  services: [],
};

const departmentHeadSlice = createSlice({
  name: "departmentHead",
  initialState,
  reducers: {
    actionStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    actionSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    actionFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      const responseData = action.payload?.data || [];
      state.employees = Array.isArray(responseData) ? responseData : [];
      state.services = Array.isArray(responseData)
        ? responseData
            .filter((emp) => emp.service)
            .map((emp) => emp.service)
        : [];
    },
    addEmployeeToState: (state, action) => {
      state.employees.push(action.payload);
    },
    addServiceToState: (state, action) => {
      state.services.push(action.payload);
    },
    clearDepartmentHeadState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.employees = [];
      state.services = [];
    },
  },
});

export const {
  actionStart,
  actionSuccess,
  actionFailure,
  fetchSuccess,
  addEmployeeToState,
  addServiceToState,
  clearDepartmentHeadState,
} = departmentHeadSlice.actions;

// Thunks

// Add Employee
export const addEmployee = (employeeData) => async (dispatch) => {
  dispatch(actionStart());
  try {
    const res = await addEmployeeApi(employeeData);
    dispatch(actionSuccess());
    dispatch(addEmployeeToState(res.data));
    toast.success("Employee added successfully!");
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(actionFailure(message));
    toast.error(message);
  }
};

// Add Service
export const addService = (serviceData) => async (dispatch) => {
  dispatch(actionStart());
  try {
    const res = await addServiceApi(serviceData);
    dispatch(actionSuccess());
    dispatch(addServiceToState(res.data));
    toast.success("Service added successfully!");
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(actionFailure(message));
    toast.error(message);
  }
};

// Fetch Department Data
export const fetchDepartmentData = () => async (dispatch) => {
  dispatch(actionStart());
  try {
    const res = await getDepartmentDataApi();
    dispatch(fetchSuccess(res.data));
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(actionFailure(message));
    toast.error(message);
  }
};

export default departmentHeadSlice.reducer;
