import { Resource } from "@/lib/yandexDisk/types";
import { FolderIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface FolderItemProps {
  resource: Resource;
}

export function FolderItem({ resource }: FolderItemProps) {
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
