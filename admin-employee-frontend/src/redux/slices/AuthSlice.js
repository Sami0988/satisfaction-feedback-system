import { createSlice } from "@reduxjs/toolkit";
import { demoUsers } from "../../data/demodata";

const getInitialState = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    return {
      isAuthenticated: true,
      user: JSON.parse(storedUser),
      loading: false,
      error: null,
    };
  }
  return {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Async action for demo login
export const loginUser = (email, password) => (dispatch) => {
  dispatch(loginStart());

  // Simulate API call delay
  setTimeout(() => {
    // Check against demo users
    if (
      email === demoUsers.admin.email &&
      password === demoUsers.admin.password
    ) {
      dispatch(loginSuccess(demoUsers.admin));
    } else if (
      email === demoUsers.employee.email &&
      password === demoUsers.employee.password
    ) {
      dispatch(loginSuccess(demoUsers.employee));
    } else {
      dispatch(loginFailure("Invalid email or password"));
    }
  }, 1000);
};

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;
