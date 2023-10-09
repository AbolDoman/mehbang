import axios from "axios";

// if we dont need to x-auth-token
export const AxiosInstance = () =>
  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
