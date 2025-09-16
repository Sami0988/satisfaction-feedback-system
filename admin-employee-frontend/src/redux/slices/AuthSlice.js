import { createSlice } from "@reduxjs/toolkit";
import { login as loginApi, logout as logoutApi } from "../../api/AutApi";

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
      state.user = action.payload.user;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token); // store token
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
    dispatch(loginSuccess(data));
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
