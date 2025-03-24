import { FilesResourceList } from "./types";
import { api } from "./yandexDiskApi";

export async function getAllFiles(): Promise<FilesResourceList> {
  const params = new URLSearchParams({
    media_type: "audio",
    limit: "100",
  });

  const response = await api.get("/resources/files", {
    params,
  });

  return response.data;
}
