import { ResourceType } from "@/server/yandexDisk/types";

export interface FileListResponse {
  items: FileItem[];
  limit: number;
  offset: number;
  total: number;
}

export interface FileItem {
  name: string;
  path: string;
  type: ResourceType;
}