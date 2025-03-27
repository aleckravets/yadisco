import { FilesListRequestParams, FilesResourceList } from "./types";
import { api } from "./yandexDiskApi";

export async function getFilesList(
  params?: FilesListRequestParams
): Promise<FilesResourceList> {
  const response = await api.get<FilesResourceList>("/resources/files", {
    params: params && getUrlSearchParams(params),
  });

  return response.data;
}

function getUrlSearchParams(params: FilesListRequestParams) {
  const urlSearchParams = {
    ...params,
    media_type: Array.isArray(params.media_type)
      ? params.media_type.join(",")
      : params.media_type,
  };

  return urlSearchParams;
}
