import axios from "axios";
import { APP_CONSTANTS } from "@/constant/app";
import { getLocalStorageString } from "@/utils/localStorage";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

// Multipart instance
export const axiosInstanceMultipart = axios.create({
  baseURL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "multipart/form-data",
  },
});

// Interceptor to add token
const addTokenToRequest = (req) => {
  if (typeof window !== "undefined") {
    const token = getLocalStorageString(APP_CONSTANTS.token);
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
};

axiosInstance.interceptors.request.use(addTokenToRequest);
axiosInstanceMultipart.interceptors.request.use(addTokenToRequest);

export default axiosInstance;
