// admin-employee-frontend/src/redux/slices/departmentHeadSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addEmployeeApi,
  addServiceApi,
  getDepartmentDataApi,
  getServicesApi,
  deleteEmployeeApi,
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
    // Fetch Employees + Services together (from department API)
    fetchDepartmentSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      const responseData = action.payload?.data || [];
      state.employees = Array.isArray(responseData) ? responseData : [];
      // Extract unique services from employees
      const serviceList = Array.isArray(responseData)
        ? responseData.filter((emp) => emp.service).map((emp) => emp.service)
        : [];
      // Remove duplicate services by service_id
      state.services = Array.from(
        new Map(serviceList.map((s) => [s.service_id, s])).values()
      );
    },
    // Fetch services separately
    fetchServicesSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.services = Array.isArray(action.payload) ? action.payload : [];
    },
    addEmployeeToState: (state, action) => {
      state.employees.push(action.payload);
    },
    addServiceToState: (state, action) => {
      state.services.push(action.payload);
    },
    removeEmployeeFromState: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.employee_id !== action.payload
      );
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
  fetchDepartmentSuccess,
  fetchServicesSuccess,
  addEmployeeToState,
  addServiceToState,
  removeEmployeeFromState,
  clearDepartmentHeadState,
} = departmentHeadSlice.actions;

// Fetch Department Data (employees + services)
export const fetchDepartmentData = () => async (dispatch) => {
  dispatch(actionStart());
  try {
    const res = await getDepartmentDataApi();
    dispatch(fetchDepartmentSuccess(res.data));
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(actionFailure(message));
    toast.error(message);
  }
};

// Fetch only services
// Fetch only services
export const fetchServices = () => async (dispatch) => {
  dispatch(actionStart());
  try {
    const res = await getServicesApi();
    console.log("API Response for services:", res); // Debug log

    // ✅ The actual array is in res.data.data
    const services = res.data?.data || [];

    dispatch(fetchServicesSuccess(services));
    console.log("Fetched Services:", services); // Debug log
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(actionFailure(message));
    toast.error(message);
  }
};


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

// Delete Employee
export const deleteEmployee = (employeeId) => async (dispatch) => {
  dispatch(actionStart());
  try {
    await deleteEmployeeApi(employeeId);
    dispatch(actionSuccess());
    dispatch(removeEmployeeFromState(employeeId));
    toast.success("Employee deleted successfully!");
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(actionFailure(message));
    toast.error(message);
  }
};

export default departmentHeadSlice.reducer;
