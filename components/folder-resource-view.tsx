import { getResource } from "@/lib/yandexDisk/getResource";
import { FolderItem } from "./folder-item";
import { FileItem } from "./file-item";

interface FilesProps {
  path?: string;
}

export async function FolderResourceView({ path }: FilesProps) {
  const resource = await getResource(
    {
      path: path || "/",
    },
    { cache: "force-cache" }
  );

  const { _embedded: embedded } = resource;

  return (
    <ul className="">
      {embedded &&
        embedded.items.map((resource) => (
          <li key={resource.path} className="group p-3 hover:bg-gray-100">
            {resource.type === "dir" ? (
              <FolderItem resource={resource} />
            ) : (
              <FileItem resource={resource} />
            )}
          </li>
        ))}
    </ul>
  );
}
