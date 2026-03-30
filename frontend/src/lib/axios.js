import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://codesync-backend-ln3g.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;