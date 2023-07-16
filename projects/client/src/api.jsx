import axios from "axios";
import { unstable_HistoryRouter } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:8000/", // replace with your base URL
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

api.interceptors.response.use(
  function (response) {
    // If the request succeeds, we don't have to do anything and can simply return the response
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status === 401) {
      // If we receive a 401 response, the token is expired or invalid. We log out the user and redirect to login page
      localStorage.clear();
      const history = unstable_HistoryRouter();
      history.push("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
