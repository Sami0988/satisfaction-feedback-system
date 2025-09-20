// admin-employee-frontend/src/redux/slices/departmentHeadSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addEmployeeAndServiceApi,
  getDepartmentDataApi,
  updateEmployeeAndServiceApi,
  patchUpdateEmployeeAndServiceApi,
  deleteEmployeeOrServiceApi,
} from "../../api/DepartmentHead/departmentHeadApi";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  success: false,
  error: null,
  employees: [], // Ensure this is always an array
  services: [], // Ensure this is always an array
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
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.error = null;

      // Safely handle the API response structure
      const responseData = action.payload?.data || [];

      // Ensure employees is always an array
      state.employees = Array.isArray(responseData) ? responseData : [];

      // Extract services safely
      state.services = Array.isArray(responseData)
        ? responseData
            .filter((emp) => emp.service !== null && emp.service !== undefined)
            .map((emp) => emp.service)
        : [];
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.employees = []; // Reset to empty array on error
      state.services = []; // Reset to empty array on error
    },
    updateEmployeeInState: (state, action) => {
      const updatedEmployee = action.payload;
      state.employees = state.employees.map((emp) =>
        emp.employee_id === updatedEmployee.employee_id ? updatedEmployee : emp
      );

      // Also update the service if it exists
      if (updatedEmployee.service) {
        state.services = state.services.map((srv) =>
          srv.service_id === updatedEmployee.service.service_id
            ? updatedEmployee.service
            : srv
        );
      }
    },
    addEmployeeToState: (state, action) => {
      const newEmployee = action.payload;
      state.employees = [...state.employees, newEmployee];

      if (newEmployee.service) {
        state.services = [...state.services, newEmployee.service];
      }
    },
    removeEmployeeFromState: (state, action) => {
      const employeeId = action.payload;
      const employeeToRemove = state.employees.find(
        (emp) => emp.employee_id === employeeId
      );

      state.employees = state.employees.filter(
        (emp) => emp.employee_id !== employeeId
      );

      // Also remove the associated service if it exists
      if (employeeToRemove && employeeToRemove.service) {
        state.services = state.services.filter(
          (srv) => srv.service_id !== employeeToRemove.service.service_id
        );
      }
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
  fetchStart,
  fetchSuccess,
  fetchFailure,
  updateEmployeeInState,
  addEmployeeToState,
  removeEmployeeFromState,
  clearDepartmentHeadState,
} = departmentHeadSlice.actions;

// Thunks

// Add employee and/or service
export const addEmployeeAndService = (data) => async (dispatch) => {
  dispatch(actionStart());
  try {
    const res = await addEmployeeAndServiceApi(data);
    dispatch(actionSuccess());
    dispatch(addEmployeeToState(res.data));
    toast.success("Employee and/or service added successfully!");
    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to add employee/service";
    dispatch(actionFailure(message));
    toast.error(message);
    throw error;
  }
};

// Fetch employees and services
export const fetchDepartmentData = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await getDepartmentDataApi();
    console.log("Department data fetched:", res.data);

    // Pass the correct data structure to the reducer
    dispatch(fetchSuccess(res.data));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to fetch data";
    dispatch(fetchFailure(message));
    toast.error(message);
  }
};

// Full update (PUT)
export const updateEmployeeAndService =
  (employeeId, data) => async (dispatch) => {
    dispatch(actionStart());
    try {
      const res = await updateEmployeeAndServiceApi(employeeId, data);
      dispatch(updateEmployeeInState(res.data));
      toast.success("Employee and linked service fully updated!");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update employee/service";
      dispatch(actionFailure(message));
      toast.error(message);
    }
  };

// Partial update (PATCH)
export const patchUpdateEmployeeAndService =
  (employeeId, data) => async (dispatch) => {
    dispatch(actionStart());
    try {
      const res = await patchUpdateEmployeeAndServiceApi(employeeId, data);
      dispatch(updateEmployeeInState(res.data));
      toast.success("Employee and linked service partially updated!");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to partially update employee/service";
      dispatch(actionFailure(message));
      toast.error(message);
    }
  };

// Delete employee or service
export const deleteEmployeeOrService = (type, id) => async (dispatch) => {
  dispatch(actionStart());
  try {
    await deleteEmployeeOrServiceApi(type, id);

    if (type === "employee") {
      dispatch(removeEmployeeFromState(id));
    } else {
      // For service deletion, refetch to ensure consistency
      dispatch(fetchDepartmentData());
    }

    toast.success(
      `${type === "employee" ? "Employee" : "Service"} deleted successfully!`
    );
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete employee/service";
    dispatch(actionFailure(message));
    toast.error(message);
  }
};

export default departmentHeadSlice.reducer;
