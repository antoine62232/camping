import apiClient from "../api/apiClient";

export const getKpi = (params) =>
  apiClient.get("/kpi", { params });