// admin-employee-frontend/src/api/DepartmentHead/departmentHeadApi.js
import API from "../index"; // Axios instance

// Base URL for department head-related endpoints
const DEPARTMENT_HEAD_URL = "/admin/employee-service";

// ✅ Add a new employee
export const addEmployeeApi = (employeeData) => {
  return API.post(`${DEPARTMENT_HEAD_URL}/employee`, employeeData);
};

// ✅ Add a new service (if needed elsewhere)
export const addServiceApi = (serviceData) => {
  return API.post("/admin/add-services", serviceData);
};

// ✅ Fetch all services
export const getServicesApi = () => {
  return API.get("/admin/get-services");
};

// ✅ Fetch all department data (employees and services)
export const getDepartmentDataApi = () => {
  return API.get(`${DEPARTMENT_HEAD_URL}`);
};

// ✅ Optional: delete employee by ID (you mentioned you plan to add this)
export const deleteEmployeeApi = (employeeId) => {
  return API.delete(`${DEPARTMENT_HEAD_URL}/employee/${employeeId}`);
};
