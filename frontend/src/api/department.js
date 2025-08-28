import API from "./index";

export const getDepartments = async () => {
  try {
    const response = await API.get("/departments");
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
