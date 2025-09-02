import API from "./index";

export const getEmployees = async (
  page = 1,
  perPage = 10,
  departmentId,
  serviceId
) => {
  try {
    const response = await API.get("/employees", {
      params: {
        page,
        per_page: perPage,
        department_id: departmentId,
        service_id: serviceId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
