import { getFilesList } from "@/lib/yandexDisk/getFilesList";
import { FilesList } from "@/components/files-list";

interface Params {
  path?: string[];
}

interface Props {
  params: Promise<Params>;
}

export default async function Page({ params }: Props) {
  const { path } = await params;

  const files = await getFilesList({
    media_type: ["audio", "video"],
    limit: 100,
  });
  return (
    <div className="h-full">
      <div>Path: {path?.join("/")}</div>
      <FilesList files={files} />;
    </div>
  );
}
