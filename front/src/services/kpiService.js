import apiClient from "../api/apiClient";

export const getKpi = (params) =>
  apiClient.get("/kpi", { params });

export const downloadKpiCsv = (params) =>
  apiClient.get("/kpi/export-csv", {
    params,
    responseType: "blob",
  });