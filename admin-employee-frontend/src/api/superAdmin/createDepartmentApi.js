import API from "../index"; // your Axios instance

const SUPER_ADMIN_DEPARTMENTS_URL = "/super-admin/departments";

// Get all departments (super-admin)
export const getDepartmentsApi = async () => {
  return API.get(SUPER_ADMIN_DEPARTMENTS_URL);
};

// Create a department
export const createDepartmentApi = async (departmentData) => {
  return API.post(`${SUPER_ADMIN_DEPARTMENTS_URL}`, departmentData);
};

// Update a department
export const updateDepartmentApi = async (id, departmentData) => {
  return API.put(`${SUPER_ADMIN_DEPARTMENTS_URL}/update/${id}`, departmentData);
};

// Delete a department
export const deleteDepartmentApi = async (id) => {
  return API.delete(`${SUPER_ADMIN_DEPARTMENTS_URL}/delete/${id}`);
};
