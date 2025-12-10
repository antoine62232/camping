import apiClient from "../api/apiClient";

export const getAllEmployeeSchedules = () =>
  apiClient.get("/employeesSchedules");

export const getEmployeeScheduleById = (id) =>
  apiClient.get(`/employeesSchedules/${id}`);

export const createEmployeeSchedule = (data) =>
  apiClient.post("/employeesSchedules", data);

export const updateEmployeeSchedule = (id, data) =>
  apiClient.put(`/employeesSchedules/${id}`, data);

export const deleteEmployeeSchedule = (id) =>
  apiClient.delete(`/employeesSchedules/${id}`);
