import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/", // replace with your base URL
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default api;
