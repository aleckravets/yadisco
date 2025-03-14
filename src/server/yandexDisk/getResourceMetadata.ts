import { Resource } from "./types";
import { api } from "./yandexDiskApi";

interface GetResourceMetadataParams {
  path?: string; // Путь к файлу или папке '/path/to/resource'
  fields?: string; // Список свойств, которые нужно включить в ответ (опционально), 'name,_embedded.items.path'
  limit?: number; // Количество возвращаемых ресурсов (по умолчанию 20)
  offset?: number; // Смещение для постраничного вывода (по умолчанию 0)
  previewCrop?: string; // Признак обрезки превью (по умолчанию 'false')
  previewSize?: string; // Размер превью (опционально, например '120x240')
  sort?: string; // Атрибут сортировки (по умолчанию 'name')
}

// Метод для получения метаинформации о файле или папке
export async function getResourceMetadata({
  path = "",
  fields = "",
  limit = 20,
  offset = 0,
  previewCrop = "false",
  previewSize = "",
  sort = "name",
}: GetResourceMetadataParams): Promise<Resource> {
  const params = new URLSearchParams({
    path: encodeURIComponent(path),
    fields: fields,
    limit: limit.toString(),
    offset: offset.toString(),
    preview_crop: previewCrop,
    preview_size: previewSize,
    sort: sort,
  });

  const response = await api.get("/resources", {
    params,
  });

  return response.data;
}
