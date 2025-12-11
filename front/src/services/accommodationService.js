import apiClient from "../api/apiClient";

export const getAllAccommodations = () =>
  apiClient.get("/accommodations/allAccommodations");

export const getAccommodationById = (id) =>
  apiClient.get(`/accommodations/accommodationById/${id}`);

export const createAccommodation = (data) =>
  apiClient.post("/accommodations/addAccommodation", data);

export const updateAccommodation = (id, data) =>
  apiClient.put(`/accommodations/updateAccommodation/${id}`, data);

export const deleteAccommodation = (id) =>
  apiClient.delete(`/accommodations/deleteAccommodation/${id}`);