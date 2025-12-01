// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // your backend
  withCredentials: true,                // send/receive cookies
});

export default api;
