import axios from "axios";

// Configure the base URL of your FastAPI backend
// React dev server runs on http://localhost:5173, backend on http://localhost:8000
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
