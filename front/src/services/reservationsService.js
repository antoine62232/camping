import apiClient from "../api/apiClient";

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

export const cancelAndRefundReservation = (idReservation) =>
  apiClient.post(`/reservations/${idReservation}/cancel-and-refund`);

export const getReservationsByUser = (userId) =>
  apiClient.get(`/reservations/user/${userId}`);
