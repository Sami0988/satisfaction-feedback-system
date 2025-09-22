import API from "../index"; // your Axios instance

const SUPER_ADMIN_DEPARTMENTS_URL = "/super-admin/departments";

// Get all departments
export const getDepartmentsApi = async () => {
  return API.get(SUPER_ADMIN_DEPARTMENTS_URL);
};

// Create a department
export const createDepartmentApi = async (departmentData) => {
  return API.post(`${SUPER_ADMIN_DEPARTMENTS_URL}`, departmentData);
};

// Full update (PUT)
export const updateDepartmentApi = async (id, departmentData) => {
  return API.put(`${SUPER_ADMIN_DEPARTMENTS_URL}/${id}`, departmentData);
};

// Partial update (PATCH)
export const patchUpdateDepartmentApi = async (id, departmentData) => {
  return API.patch(`${SUPER_ADMIN_DEPARTMENTS_URL}/${id}`, departmentData);
};

// Delete a department
export const deleteDepartmentApi = async (id) => {
  return API.delete(`${SUPER_ADMIN_DEPARTMENTS_URL}/${id}`);
};
