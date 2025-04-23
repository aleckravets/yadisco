"use client";

import { FolderItem } from "./folder-item";
import { FileItem } from "./file-item";
import { Resource } from "@/lib/yandexDisk/types";
import { MusicFileItem } from "./music-file-item";
import { use } from "react";

interface FilesProps {
  resource: Promise<Resource>;
}

export function FolderResourceView({
  resource: resourcePromise,
}: FilesProps) {
  const resource = use(resourcePromise);

  const { _embedded: embedded } = resource;

  return (
    <ul className="">
      {embedded &&
        embedded.items.map((resource) => (
          <li key={resource.path} className="group p-3 hover:bg-gray-100">
            {getItem(resource)}
          </li>
        ))}
    </ul>
  );
}

function getItem(resource: Resource) {
  const { type, mime_type } = resource;

  if (type === "dir") {
    return <FolderItem resource={resource} />;
  }

  const isAudio = mime_type?.startsWith("audio");

  if (isAudio) {
    return <MusicFileItem resource={resource} />;
  }

  return <FileItem resource={resource} />;
}
