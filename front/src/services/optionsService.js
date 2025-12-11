import apiClient from "../api/apiClient";

export const getAllOptions = () =>
  apiClient.get("/options/");


export const getOptionById = (id) =>
  apiClient.get(`/options/${id}`);


export const createOption = (data) =>
  apiClient.post("/options/register", data);


export const updateOption = (id, data) =>
  apiClient.put(`/options/update/${id}`, data);


export const deleteOption = (id) =>
  apiClient.delete(`/options/delete/${id}`);
