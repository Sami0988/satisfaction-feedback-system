// admin-employee-frontend/src/api/departmentHeadApi.js
import API from "../index"; // Axios instance

const DEPARTMENT_HEAD_URL = "/admin/employee-service";

/**
 * Get all employees and services in the department
 */
export const getDepartmentDataApi = async () => {
  return API.get(DEPARTMENT_HEAD_URL);
};

/**
 * Add employee and/or service
 * @param {Object} data - { employee: {...}, service: {...} }
 */
export const addEmployeeAndServiceApi = async (data) => {
  return API.post(DEPARTMENT_HEAD_URL, data);
};

/**
 * Update employee and/or linked service (full update)
 * @param {string} employeeId
 * @param {Object} data - { full_name, email, phone, password, role, service: {...} }
 */
export const updateEmployeeAndServiceApi = async (employeeId, data) => {
  return API.put(`${DEPARTMENT_HEAD_URL}/${employeeId}`, data);
};

/**
 * Partial update (PATCH) employee and/or linked service
 * @param {string} employeeId
 * @param {Object} data - { full_name?, email?, phone?, password?, role?, service? }
 */
export const patchUpdateEmployeeAndServiceApi = async (employeeId, data) => {
  return API.patch(`${DEPARTMENT_HEAD_URL}/${employeeId}`, data);
};

/**
 * Delete an employee or a service
 * @param {string} type - "employee" or "service"
 * @param {string} id - employee_id or service_id
 */
export const deleteEmployeeOrServiceApi = async (type, id) => {
  return API.delete(`${DEPARTMENT_HEAD_URL}/${type}/${id}`);
};
