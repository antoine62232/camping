import apiClient from "./apiClient";

export const createNotice = (data) =>
  apiClient.post("/notices/add", data);

export const getAllNotices = () =>
  apiClient.get("/notices/");

export const getNoticeById = (id) =>
  apiClient.get(`/notices/${id}`);

export const updateNotice = (id, data) =>
  apiClient.put(`/notices/${id}`, data);

export const deleteNotice = (id) =>
  apiClient.delete(`/notices/${id}`);
