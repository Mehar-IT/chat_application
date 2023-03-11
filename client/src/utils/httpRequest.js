import axios from "axios";

// const BASE_URL = "http://localhost:3000/api";
const BASE_URL = "/api";

export default axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: BASE_URL,
  // withCredentials: true,
});
