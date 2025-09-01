import API from "./index";

export const getDepartments = async (page = 1, perPage = 12, search = "") => {
  try {
    const params = {
      page,
      per_page: perPage,
    };

    if (search) {
      params.search = search;
    }

    const response = await API.get("/departments", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const getDepartmentById = async (id) => {
  try {
    const response = await API.get(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching department ${id}:`, error);
    throw error;
  }
};

export const createDepartment = async (departmentData) => {
  try {
    const response = await API.post("/departments", departmentData);
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};

export const updateDepartment = async (id, departmentData) => {
  try {
    const response = await API.put(`/departments/${id}`, departmentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating department ${id}:`, error);
    throw error;
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await API.delete(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting department ${id}:`, error);
    throw error;
  }
};

export const searchDepartments = async (query, page = 1, perPage = 12) => {
  try {
    const params = {
      search: query,
      page,
      per_page: perPage,
    };

    const response = await API.get("/departments", { params });
    return response.data;
  } catch (error) {
    console.error("Error searching departments:", error);
    throw error;
  }
};
