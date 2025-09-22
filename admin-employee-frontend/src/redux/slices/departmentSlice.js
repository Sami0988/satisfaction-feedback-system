import { createSlice } from "@reduxjs/toolkit";
import {
  createDepartmentApi,
  getDepartmentsApi,
  updateDepartmentApi,
  patchUpdateDepartmentApi,
  deleteDepartmentApi,
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
      state.departments.push(action.payload); // add to list
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
      state.departments = action.payload;
      state.error = null;
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

// Create department
export const createDepartment = (departmentData) => async (dispatch) => {
  dispatch(createStart());
  try {
    const res = await createDepartmentApi(departmentData);
    dispatch(createSuccess(res.data));
    toast.success("Department created successfully!");
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to create department";
    dispatch(createFailure(message));
    toast.error(message);
  }
};

// Fetch all departments
export const fetchDepartments = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await getDepartmentsApi();
    // Use the employees array from response
    const departmentsArray = res.data.employees || [];
    dispatch(fetchSuccess(departmentsArray));
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch departments";
    dispatch(fetchFailure(message));
    toast.error(message);
  }
};


// Full update (PUT)
export const updateDepartment =
  (id, departmentData) => async (dispatch, getState) => {
    try {
      const res = await updateDepartmentApi(id, departmentData);
      toast.success("Department updated successfully!");
      const { departments } = getState().department;
      const updatedDepartments = departments.map((dept) =>
        dept.department_id === id ? res.data.department : dept
      );
      dispatch(fetchSuccess(updatedDepartments));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update department";
      toast.error(message);
    }
  };

// Partial update (PATCH)
export const patchUpdateDepartment =
  (id, departmentData) => async (dispatch, getState) => {
    try {
      const res = await patchUpdateDepartmentApi(id, departmentData);
      toast.success("Department partially updated successfully!");

      const { departments } = getState().department;
      const updatedDepartments = departments.map((dept) =>
        dept.department_id === id ? res.data.department : dept
      );
      dispatch(fetchSuccess(updatedDepartments));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to partially update department";
      toast.error(message);
    }
  };

// Delete department
export const deleteDepartment = (id) => async (dispatch, getState) => {
  try {
    await deleteDepartmentApi(id);
    toast.success("Department deleted successfully!");

    const { departments } = getState().department;
    const updatedDepartments = departments.filter(
      (dept) => dept.department_id !== id
    );
    dispatch(fetchSuccess(updatedDepartments));
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete department";
    toast.error(message);
  }
};

export default departmentSlice.reducer;
