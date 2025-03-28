"use client";
import { FilesResourceList } from "@/lib/yandexDisk/types";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { DocumentIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";

interface FilesProps {
  files: FilesResourceList;
}

export function FilesList({ files }: FilesProps) {
  // const [items, setItems] = useState(files.items);

  return (
    <ul className="h-full overflow-y-auto divide-y divide-gray-200">
      {files.items.map((file, index) => (
        <li
          key={index}
          className="group flex items-center justify-between p-3 hover:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <FileIcon mimeType={file.mime_type} />
            {/* <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center"></div> */}

            <div>
              <p className="font-medium text-gray-900 truncate max-w-xs">
                {file.name}
              </p>
            </div>
          </div>

          <a
            href={`/api/download?path=${file.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden group-hover:inline-block"
          >
            <ArrowDownTrayIcon className="size-6" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType?.startsWith("audio")) {
    return <MusicalNoteIcon className="size-6" />;
  }

  return <DocumentIcon className="size-6" />;
}
