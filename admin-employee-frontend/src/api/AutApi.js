import API from "./index";

// Existing login and logout functions
export const login = async (username, password) => {
  const response = await API.post("/login", { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await API.post("/logout");
  return response.data;
};

// ✅ Forgot password request
export const forgotPassword = async (email) => {
  const response = await API.post("/forgot/password", { email });
  return response.data;
};

// ✅ Reset password request
export const resetPassword = async (token, newPassword) => {
  const response = await API.post(`/reset/password/${token}`, {
    password: newPassword,
  });
  return response.data;
};
