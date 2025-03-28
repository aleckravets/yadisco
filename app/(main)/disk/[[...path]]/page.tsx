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
  const { path } = await params;
  const decodedPath = path?.map(decodeURIComponent);

  return (
    <div className="h-full flex flex-col">
      <div className="h-16">
        <Breadcrumbs path={decodedPath} />
      </div>
      <div className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <FolderResourceView path={decodedPath} />
        </Suspense>
      </div>
    </div>
  );
}
