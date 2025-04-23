import { Resource } from "@/lib/yandexDisk/types";
import {
  ArrowDownTrayIcon,
  MusicalNoteIcon,
  PlusIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { MouseEvent } from "react";

interface FileItemProps {
  resource: Resource;
}

export function MusicFileItem({ resource }: FileItemProps) {
  const handlePlay = () => {
    console.log("play");
  };

  const handleAddToPlaylist = () => {
    console.log("add to playlist");
  };

  return (
    <div className="flex gap-3 group cursor-pointer" onClick={handlePlay}>
      <div className="flex-1 flex gap-3">
        <MusicalNoteIcon className="size-6 group-hover:hidden" />
        <PlayIcon className="size-6 hidden group-hover:block" />
        <div>
          <p className="font-medium text-gray-900 truncate max-w-xs">
            {resource.name}
          </p>
        </div>
      </div>
      <MusicFileActions resource={resource} onAdd={handleAddToPlaylist} />
    </div>
  );
}

function MusicFileActions({
  resource,
  onAdd,
}: {
  resource: Resource;
  onAdd: () => void;
}) {
  const path = resource.path.replace("disk:/", "");

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAdd();
  };

  return (
    <div className="hidden group-hover:flex gap-1">
      <button
        className="cursor-pointer"
        title="Добавить в плэйлист"
        onClick={handleAdd}
      >
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
