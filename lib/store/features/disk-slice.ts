import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Resource } from "@/lib/yandexDisk/types";

// Define a service using a base URL and expected endpoints
export const diskApi = createApi({
  reducerPath: "diskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/disk" }),
  endpoints: (build) => ({
    getFilesByPath: build.query<Resource, string>({
      query: (path) => `/${name}`,
    }),
  }),
});

// auto-generated hooks based on the defined endpoints
export const { useGetFilesByPathQuery } = diskApi;
