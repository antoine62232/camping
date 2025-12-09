import apiClient from "./apiClient";

export const createReservation = (data) =>
  apiClient.post("/reservations/register", data);

export const getAllReservations = () =>
  apiClient.get("/reservations/");

export const getReservationById = (id) =>
  apiClient.get(`/reservations/${id}`);

export const updateReservation = (id, data) =>
  apiClient.put(`/reservations/update/${id}`, data);

export const deleteReservation = (id) =>
  apiClient.delete(`/reservations/delete/${id}`);
