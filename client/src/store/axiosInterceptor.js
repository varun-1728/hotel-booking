import axios from "axios";
import store from "../store";
import { refresh, logout } from "../store/authSlice";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // ✅ important for cookies
});

// Add token before every request
api.interceptors.request.use((config) => {
  const token = store.getState().auth.access;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    if (err.response?.status === 401 && !originalReq._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) =>
          failedQueue.push({ resolve, reject })
        ).then((token) => {
          originalReq.headers["Authorization"] = `Bearer ${token}`;
          return api(originalReq);
        });
      }

      originalReq._retry = true;
      isRefreshing = true;
      try {
        const token = await store.dispatch(refresh()).unwrap();
        originalReq.headers["Authorization"] = `Bearer ${token}`;
        processQueue(null, token);
        return api(originalReq);
      } catch (e) {
        processQueue(e, null);
        store.dispatch(logout());
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

export default api;
