// https://yandex.ru/dev/disk-api/doc/ru/reference/response-objects

export type ResourceType = "dir" | "file";

export type MediaType =
  | "audio"
  | "backup"
  | "book"
  | "compressed"
  | "data"
  | "development"
  | "diskimage"
  | "document"
  | "encoded"
  | "executable"
  | "flash"
  | "font"
  | "image"
  | "settings"
  | "spreadsheet"
  | "text"
  | "unknown"
  | "video"
  | "web";

// Описание ресурса, мета-информация о файле или папке.
export interface Resource {
  public_key?: string;
  _embedded?: ResourceList;
  name: string;
  created: string; // Дата в формате ISO 8601
  custom_properties: Record<string, string>; // Объект с парами ключ-значение типа string
  public_url?: string;
  origin_path: string;
  modified: string; // Дата в формате ISO 8601
  path: string;
  md5: string;
  type: ResourceType;
  mime_type: string;
  size: number;
  preview?: string; // Ссылка на превью изображения, доступна только для определённых типов файлов
}

// Список ресурсов, содержащихся в папке. Содержит объекты Resource и свойства списка.
export interface ResourceList {
  sort?: string; // Поле, по которому отсортирован список
  public_key?: string; // Ключ опубликованной папки, включается только для публичных папок
  items: Resource[]; // Массив объектов Resource, содержащихся в папке
  limit: number; // Максимальное количество элементов в массиве, указанное в запросе
  offset: number; // Смещение от первого ресурса в папке
  path: string; // Путь к папке
  total: number; // Общее количество ресурсов в папке
}

// Плоский список всех файлов на Диске в алфавитном порядке.
export interface FilesResourceList {
  items: Resource[]; // Массив объектов Resource, представляющих файлы
  limit: number; // Максимальное количество элементов в массиве, указанное в запросе
  offset: number; // Смещение от первого ресурса в списке
}

export type FilesListRequestParams = {
  limit?: number; // Количество файлов (по умолчанию 20)
  media_type?: MediaType | MediaType[];
  offset?: number; // Смещение для пагинации
  fields?: string; // Список свойств JSON, которые включить в ответ (например, "name,_embedded.items.path")
  preview_size?: string; // Размер превью (например, "M", "100x100")
  preview_crop?: boolean; // Обрезка превью (true/false)
};

export interface ResourceRequestParams {
  path?: string; // Путь к файлу или папке '/path/to/resource'
  fields?: string; // Список свойств, которые нужно включить в ответ (опционально), 'name,_embedded.items.path'
  limit?: number; // Количество возвращаемых ресурсов (по умолчанию 20)
  offset?: number; // Смещение для постраничного вывода (по умолчанию 0)
  previewCrop?: string; // Признак обрезки превью (по умолчанию 'false')
  previewSize?: string; // Размер превью (опционально, например '120x240')
  sort?: string; // Атрибут сортировки (по умолчанию 'name')
}
