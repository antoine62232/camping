import apiClient from "../api/apiClient";

export const getFinancialReport = (params) =>
  apiClient.get("/reports/finance", { params });