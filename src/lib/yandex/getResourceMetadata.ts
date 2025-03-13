import axios from "axios";
import { ResourceList } from "./types";

interface GetResourceMetadataParams {
  path: string; // Путь к файлу или папке '/path/to/resource'
  fields?: string; // Список свойств, которые нужно включить в ответ (опционально), 'name,_embedded.items.path'
  limit?: number; // Количество возвращаемых ресурсов (по умолчанию 20)
  offset?: number; // Смещение для постраничного вывода (по умолчанию 0)
  previewCrop?: string; // Признак обрезки превью (по умолчанию 'false')
  previewSize?: string; // Размер превью (опционально, например '120x240')
  sort?: string; // Атрибут сортировки (по умолчанию 'name')
  token: string; // OAuth токен для авторизации
}

// Метод для получения метаинформации о файле или папке
export async function getResourceMetadata({
  path,
  fields = '',
  limit = 20,
  offset = 0,
  previewCrop = 'false',
  previewSize = '',
  sort = 'name',
  token,
}: GetResourceMetadataParams): Promise<ResourceList> {
  const url = 'https://cloud-api.yandex.net/v1/disk/resources';

  const params = new URLSearchParams({
    path: encodeURIComponent(path),
    fields: fields,
    limit: limit.toString(),
    offset: offset.toString(),
    preview_crop: previewCrop,
    preview_size: previewSize,
    sort: sort,
  });

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `OAuth ${token}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка при получения метаинформации о файле или папке:', error);
    throw error;
  }
}