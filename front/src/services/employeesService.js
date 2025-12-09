import apiClient from "../api/apiClient";

export const loginEmployee = async (data) => {
  const result = await apiClient.post("/employees/login", data);
  localStorage.setItem("employeeToken", result.data.token);
  return result.data;
};

export const logoutEmployee = () => {
  localStorage.removeItem("employeeToken");
};

export const getAllEmployees = () =>
  apiClient.get("/employees/allEmployees");

export const createEmployee = (data) =>
  apiClient.post("/employees/addEmployee", data);

export const updateEmployee = (id, data) =>
  apiClient.put(`/employees/updateEmployee/${id}`, data);

export const deleteEmployee = (id) =>
  apiClient.delete(`/employees/deleteEmployee/${id}`);
