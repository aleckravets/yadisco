import { Resource } from "@/lib/yandexDisk/types";
import {
  ArrowDownTrayIcon,
  DocumentIcon,
  MusicalNoteIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface FileItemProps {
  resource: Resource;
}

export function FileItem({ resource }: FileItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex-1 flex gap-3">
        <FileIcon mimeType={resource.mime_type} />
        <div>
          <p className="font-medium text-gray-900 truncate max-w-xs">
            {resource.name}
          </p>
        </div>
      </div>
      <FileActions resource={resource} />
    </div>
  );
}

export function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType?.startsWith("audio")) {
    return <MusicalNoteIcon className="size-6" />;
  }

  return <DocumentIcon className="size-6" />;
}

function FileActions({ resource }: { resource: Resource }) {
  const path = resource.path.replace("disk:/", "");

  return (
    <div className="hidden group-hover:flex gap-1">
      <button className="cursor-pointer" title="Добавить в плэйлист">
        <PlusIcon className="size-6" />
      </button>
      <a
        href={`/api/download?path=${path}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Скачать"
      >
        <ArrowDownTrayIcon className="size-6" />
      </a>
    </div>
  );
}
