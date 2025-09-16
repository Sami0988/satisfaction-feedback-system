// frontend/api/AuthApi.js
import API from "./index";

// Login request
export const login = async (username, password) => {
  const response = await API.post("/login", { username, password });
  return response.data;
};

// Logout request (optional, if your backend supports token revocation)
export const logout = async () => {
  const response = await API.post("/logout");
  return response.data;
};
