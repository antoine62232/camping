import apiClient from "../api/apiClient";

export const getFinancialReport = (params) =>
  apiClient.get("/reports/finance", { params });

export const downloadFinancialCsv = (params) =>
  apiClient.get("/reports/finance/export-csv", {
    params,
    responseType: "blob",
  });