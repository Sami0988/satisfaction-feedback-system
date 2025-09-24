import { createSlice } from "@reduxjs/toolkit";
import {
  login as loginApi,
  logout as logoutApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
} from "../../api/AutApi";

// Safe initial state
const getInitialState = () => {
  const storedUser = localStorage.getItem("user");
  let parsedUser = null;

  try {
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
    message: null, // For success messages like "reset link sent"
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = null;

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
      state.message = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
      state.message = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    forgotPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Thunks
export const loginUser = (username, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const data = await loginApi(username, password);
    if (data?.user && data?.token) {
      dispatch(loginSuccess(data));
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

// ✅ Forgot password thunk
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordStart());
  try {
    const data = await forgotPasswordApi(email);
    dispatch(forgotPasswordSuccess(data.message || "Reset link sent!"));
  } catch (error) {
    dispatch(
      forgotPasswordFailure(
        error.response?.data?.message || "Failed to send reset link"
      )
    );
  }
};

// ✅ Reset password thunk
export const resetPassword = (token, password) => async (dispatch) => {
  dispatch(resetPasswordStart());
  try {
    const data = await resetPasswordApi(token, password);
    dispatch(
      resetPasswordSuccess(data.message || "Password reset successfully!")
    );
  } catch (error) {
    dispatch(
      resetPasswordFailure(
        error.response?.data?.message || "Failed to reset password"
      )
    );
  }
};

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  clearMessage,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} = authSlice.actions;

export default authSlice.reducer;
