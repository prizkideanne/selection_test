import { useState } from "react";
import axios from "axios";

export const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("accessToken");

  const fetchApi = async (url, method = "GET", body = null, headers = {}) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: "http://localhost:8000/" + url,
        method,
        headers: token
          ? {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            }
          : {},
        data: body,
      });
      setData(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  return { data, error, isLoading, fetchApi };
};
