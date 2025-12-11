import apiClient from "../api/apiClient";

export const addReservationOption = (data) =>
  apiClient.post("/reservations-options/add", data);

export const getAllReservationsOptions = () =>
  apiClient.get("/reservations-options/");

export const getOptionsByReservation = (reservationId) =>
  apiClient.get(`/reservations-options/by-reservation/${reservationId}`);

export const updateReservationOption = (data) =>
  apiClient.put("/reservations-options/update", data);

export const deleteReservationOption = (data) =>
  apiClient.delete("/reservations-options/delete", { data });
