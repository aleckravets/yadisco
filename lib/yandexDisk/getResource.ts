import { Resource, ResourceRequestParams } from "./types";
import { yandexDiskApi } from "./yandexDiskApi";
import { getSearchParams } from "./getSearchParams";
import { Options } from "ky";

// Метод для получения метаинформации о файле или папке
export async function getResource(
  params: ResourceRequestParams,
  options?: Options
): Promise<Resource> {
  return yandexDiskApi
    .get<Resource>("resources", {
      ...options,
      searchParams: params && getSearchParams(params),
    })
    .json();
}
