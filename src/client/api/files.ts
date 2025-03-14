import { FileListResponse } from "@/server/api/files/types";
import { api } from "./clientApi";

export async function getDirectoryFiles(path = ""): Promise<FileListResponse> {
  const response = await api.get<FileListResponse>(`files`, {
    params: { path },
  });
  return response.data;
}
