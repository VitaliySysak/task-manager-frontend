import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true,
});

const isApp = import.meta.env.VITE_APP_ENV === "APP";

if (isApp) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}
