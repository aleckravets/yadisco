import { getAuthTokenCookie } from "@/server/authTokenCookie";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://cloud-api.yandex.net/v1/disk",
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAuthTokenCookie();

    if (token) {
      config.headers["Authorization"] = `OAuth ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);