import { Resource } from "@/lib/yandexDisk/types";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { DocumentIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getResourceMetadata } from "@/lib/yandexDisk/getResourceMetadata";

interface FilesProps {
  path?: string[];
}

export async function FolderResourceView({ path }: FilesProps) {
  const resource = await getResourceMetadata({
    path: path?.length ? path?.join("/") : "/",
  });

  const { _embedded: embedded } = resource;

  return (
    <ul className="h-full overflow-y-auto divide-y divide-gray-200">
      {embedded &&
        embedded.items.map((file) => (
          <li
            key={file.path}
            className="group flex items-center justify-between p-3 hover:bg-gray-100"
          >
            {file.type === "dir" ? (
              <FolderResource resource={file} />
            ) : (
              <>
                <FileResource resource={file} />
                <a
                  href={`/api/download?path=${file.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden group-hover:inline-block"
                >
                  <ArrowDownTrayIcon className="size-6" />
                </a>
              </>
            )}
          </li>
        ))}
    </ul>
  );
}

interface ResourceProps {
  resource: Resource;
}

export function FolderResource({ resource }: ResourceProps) {
  const path = resource.path.replace("disk:/", "");

  return (
    <Link href={`/disk/${path}`} className="flex items-center gap-3">
      <FolderIcon className="size-6 text-amber-300" />
      <div>
        <p className="font-medium text-gray-900 truncate max-w-xs">
          {resource.name}
        </p>
      </div>
    </Link>
  );
}

export function FileResource({ resource }: ResourceProps) {
  return (
    <div className="flex items-center gap-3">
      <FileIcon mimeType={resource.mime_type} />
      <div>
        <p className="font-medium text-gray-900 truncate max-w-xs">
          {resource.name}
        </p>
      </div>
    </div>
  );
}

interface ItemIconProps {
  mimeType: string;
}

export function FileIcon({ mimeType }: ItemIconProps) {
  if (mimeType?.startsWith("audio")) {
    return <MusicalNoteIcon className="size-6" />;
  }

  return <DocumentIcon className="size-6" />;
}
