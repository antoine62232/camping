import apiClient from "../api/apiClient";

export const createRole = (data) =>
  apiClient.post("/roles/register", data);

export const getAllRoles = () =>
  apiClient.get("/roles/");

export const getRoleById = (id) =>
  apiClient.get(`/roles/${id}`);

export const updateRole = (id, data) =>
  apiClient.put(`/roles/update/${id}`, data);

export const deleteRole = (id) =>
  apiClient.delete(`/roles/delete/${id}`);
