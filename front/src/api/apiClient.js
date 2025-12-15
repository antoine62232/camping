import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

apiClient.interceptors.request.use((config) => {
  const employeeToken = localStorage.getItem("employeeToken");
  const clientToken = localStorage.getItem("clientToken");

  const url = config.url || "";

  const isEmployeeRoute =
    url.startsWith("/employees") ||
    url.startsWith("/kpi") ||
    url.startsWith("/reports");

  if (isEmployeeRoute) {
    if (employeeToken) {
      config.headers.Authorization = `Bearer ${employeeToken}`;
    }
  } else {
    // Routes côté client
    if (clientToken) {
      config.headers.Authorization = `Bearer ${clientToken}`;
    }
  }

  return config;
});

export default apiClient;
