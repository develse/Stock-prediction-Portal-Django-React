// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ROOT || "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
