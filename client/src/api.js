// client/src/api.js
import axios from "axios";

const api = axios.create({
  // In production (Render), this becomes: https://your-app.onrender.com/api
  // In local dev, it becomes: http://localhost:3000/api (because your Vite proxy should forward /api)
  baseURL: "/api",
  withCredentials: true,
});

export default api;

