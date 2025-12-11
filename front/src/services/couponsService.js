import apiClient from "../api/apiClient";

export const createCoupon = (data) =>
  apiClient.post("/coupons/register", data);

export const getAllCoupons = () =>
  apiClient.get("/coupons/");

export const getCouponById = (id) =>
  apiClient.get(`/coupons/${id}`);

export const updateCoupon = (id, data) =>
  apiClient.put(`/coupons/update/${id}`, data);

export const deleteCoupon = (id) =>
  apiClient.delete(`/coupons/delete/${id}`);
