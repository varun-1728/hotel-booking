import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const registerApi = async (email, password) => {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
};

export const loginApi = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const refreshApi = async () => {
  const res = await api.post("/auth/refresh");
  return res.data;
};

export const logoutApi = async () => {
  await api.post("/auth/logout");
};

export default api;
