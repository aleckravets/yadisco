import { auth } from "@/auth";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://cloud-api.yandex.net/v1/disk",
});

api.interceptors.request.use(
  async (config) => {
    const session = await auth();

    config.headers["Authorization"] = `OAuth ${session?.accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
