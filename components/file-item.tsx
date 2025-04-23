import { Resource } from "@/lib/yandexDisk/types";
import {
  ArrowDownTrayIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

interface FileItemProps {
  resource: Resource;
}

export function FileItem({ resource }: FileItemProps) {
  return (
    <div className="flex gap-3 group">
      <div className="flex-1 flex gap-3">
        <DocumentIcon className="size-6" />
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

function FileActions({ resource }: { resource: Resource }) {
  const path = resource.path.replace("disk:/", "");

  return (
    <div className="hidden group-hover:flex gap-1">
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
