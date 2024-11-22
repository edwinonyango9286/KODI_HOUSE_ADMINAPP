import axios from "axios";

export const newRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  withCredentials: true,
});
