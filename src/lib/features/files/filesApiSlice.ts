import type { FileItem } from "@/app/api/files/route";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FilesApiResponse {
  items: FileItem[];
}

export const filesApiSlice = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/files" }),
  endpoints: (build) => ({
    getFiles: build.query<FilesApiResponse, void>({
      query: () => ``,
    }),
  }),
});

export const { useGetFilesQuery } = filesApiSlice;
