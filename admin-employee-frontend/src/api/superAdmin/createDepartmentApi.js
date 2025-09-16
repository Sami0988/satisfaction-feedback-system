// api/superAdmin/createDepartmentApi.js
import API from "../index"; // import your axios instance

const CREATE_DEPARTMENT_URL = "/departments/create";

export const createDepartmentApi = async (departmentData) => {
  return API.post(CREATE_DEPARTMENT_URL, departmentData);
};



export const getDepartmentsApi = async () => {
  return API.get("/departments");
};