import { FolderResourceView } from "@/components/folder-resource-view";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface Params {
  path?: string[];
}

interface Props {
  params: Promise<Params>;
}

export default async function Page({ params }: Props) {
  const { path: uriEncodedPath } = await params;
  const path = uriEncodedPath?.map(decodeURIComponent);

  return (
    <div className="h-full flex flex-col">
      <div className="h-16">
        <Breadcrumbs path={path} />
      </div>
      <div className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <FolderResourceView path={path?.join("/")} />
        </Suspense>
      </div>
    </div>
  );
}
