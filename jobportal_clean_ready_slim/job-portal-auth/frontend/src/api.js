import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default api;
