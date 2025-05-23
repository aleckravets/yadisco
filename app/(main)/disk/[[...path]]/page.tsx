import { FolderResourceView } from "@/components/folder-resource-view";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getResource } from "@/lib/yandexDisk/getResource";

interface Params {
  path?: string[];
}

interface Props {
  params: Promise<Params>;
}

export default async function Page({ params }: Props) {
  const { path: uriEncodedPath } = await params;
  const path = uriEncodedPath?.map(decodeURIComponent);

  const resource = getResource(
    {
      path: path?.join("/") || "/",
    },
    { cache: "force-cache" }
  );

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 p-4">
        <Breadcrumbs path={path} />
      </div>
      <div className="flex-1 overflow-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <FolderResourceView resource={resource} />
        </Suspense>
      </div>
    </div>
  );
}
