// axiosClient.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // ✅ để baseURL gốc
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
