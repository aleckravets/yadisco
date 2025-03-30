import { getSearchParams } from "./getSearchParams";
import {
  FilesListRequestParams as FilesRequestParams,
  FilesResourceList,
} from "./types";
import { yandexDiskApi } from "./yandexDiskApi";

// плоский список всех файлов
export async function getFiles(
  params?: FilesRequestParams
): Promise<FilesResourceList> {
  return yandexDiskApi
    .get<FilesResourceList>("resources/files", {
      searchParams: params && getSearchParams(params),
    })
    .json();
}
