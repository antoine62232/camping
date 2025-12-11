import apiClient from "../api/apiClient";

export const createPayment = (data) =>
  apiClient.post("/payments/register", data);

export const getAllPayments = () =>
  apiClient.get("/payments/");

export const getPaymentById = (id) =>
  apiClient.get(`/payments/${id}`);

export const updatePayment = (id, data) =>
  apiClient.put(`/payments/update/${id}`, data);

export const deletePayment = (id) =>
  apiClient.delete(`/payments/delete/${id}`);

export const createPaymentIntent = (amountInCents) =>
  apiClient.post("/payments/create-payment-intent", { amount: amountInCents });
