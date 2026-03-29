import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://codesync-backend-ln3g.onrender.com/api",
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
});

export default axiosInstance;