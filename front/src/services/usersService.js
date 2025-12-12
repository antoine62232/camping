import apiClient from "../api/apiClient";

export const registerUser = (data) =>
  apiClient.post("/users/register", data);

export const loginUser = async (data) => {
  const res = await apiClient.post("/users/login", data);
  const { token, user } = res.data; 

  localStorage.setItem("clientToken", token);
  localStorage.setItem("client", JSON.stringify(user));

  return res.data;
};

export const resetPassword = (data) =>
  apiClient.put("/users/reset-password", data);

export const getAllUsers = () =>
  apiClient.get("/users/");

export const getUserByEmail = (email) =>
  apiClient.get(`/users/${email}`);

export const updateUser = (id, data) =>
  apiClient.put(`/users/update/${id}`, data);

export const deleteUser = (id) =>
  apiClient.delete(`/users/delete/${id}`);
