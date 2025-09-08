// src/api/employeeApi.js
import api from "./index";

const EMPLOYEE_URL = "/employees";

// Add new employee
export const addEmployee = async (employeeData) => {
  const response = await api.post(EMPLOYEE_URL, employeeData);
  return response.data;
};

// Get all employees
export const getEmployees = async () => {
  const response = await api.get(EMPLOYEE_URL);
  return response.data;
};

// Update employee
export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`${EMPLOYEE_URL}/${id}`, employeeData);
  return response.data;
};

// Delete employee
export const deleteEmployee = async (id) => {
  const response = await api.delete(`${EMPLOYEE_URL}/${id}`);
  return response.data;
};
