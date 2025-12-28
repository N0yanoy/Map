import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.API_URL ?? "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;