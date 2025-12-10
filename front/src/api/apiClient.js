// src/services/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api"
});

apiClient.interceptors.request.use((config) => {
  const employeeToken = localStorage.getItem("employeeToken");
  const clientToken = localStorage.getItem("clientToken");

  if (config.url.startsWith("/employees")) {
    if (employeeToken) {
      config.headers.Authorization = `Bearer ${employeeToken}`;
    }
  } else {
    if (clientToken) {
      config.headers.Authorization = `Bearer ${clientToken}`;
    }
  }

  return config;
});

export default apiClient;
