// https://yandex.ru/dev/disk-api/doc/ru/reference/response-objects

export type ResourceType = "dir" | "file";

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
