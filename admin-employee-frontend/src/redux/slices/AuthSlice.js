// admin-employee-frontend/src/redux/slices/AuthSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { login as loginApi, logout as logoutApi } from "../../api/AutApi";

// Safe initial state
const getInitialState = () => {
  const storedUser = localStorage.getItem("user");
  let parsedUser = null;

  try {
    // Only parse if storedUser exists and is valid
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      parsedUser = JSON.parse(storedUser);
    }
  } catch (err) {
    console.warn("Invalid JSON in localStorage for 'user', clearing it.", err);
    localStorage.removeItem("user");
  }

  return {
    isAuthenticated: !!parsedUser,
    user: parsedUser || null,
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
      state.user = action.payload.user;
      state.error = null;

      // Store only valid user and token
      if (action.payload.user && typeof action.payload.user === "object") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
      if (action.payload.token && typeof action.payload.token === "string") {
        localStorage.setItem("token", action.payload.token);
      }
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
      state.loading = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Thunks (async actions)
export const loginUser = (username, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const data = await loginApi(username, password);

    // Only dispatch success if valid data
    if (data?.user && data?.token) {
      dispatch(loginSuccess(data));
      console.log("Login API response:", data);
    } else {
      dispatch(loginFailure("Invalid login response from server"));
    }
  } catch (error) {
    dispatch(
      loginFailure(error.response?.data?.message || "Login failed. Try again.")
    );
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await logoutApi();
  } catch (error) {
    console.warn("Logout API failed, clearing local state anyway.");
  }
  dispatch(logout());
};

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;

export default authSlice.reducer;
