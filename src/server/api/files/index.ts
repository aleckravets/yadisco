import { getResourceMetadata } from "@/server/yandexDisk/getResourceMetadata";
import { FileListResponse } from "./types";

export async function loadFilesFromYandexDisk(
  path?: string
): Promise<FileListResponse> {
  const resource = await getResourceMetadata({ path });

  if (resource.type !== "dir") {
    throw `${path} is not a directory`;
  }

  const { items, limit, offset, total } = resource._embedded!;

  return {
    items: items.map((resource) => ({
      name: resource.name,
      path: resource.path,
      type: resource.type,
    })),
    limit,
    offset,
    total,
  };
}
