import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "api",
});

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.status === 401) {
      window.location.href = "/login";
      return;
    }
    return Promise.reject(error);
  }
);
