import ShowError from "@/components/show-error";
import { getAllFiles } from "@/lib/yandexDisk/getAllFiles";
import { FilesResourceList } from "@/lib/yandexDisk/types";
import { AxiosError } from "axios";
import Link from "next/link";

export default async function Page() {
  try {
    const files = await getAllFiles();
    return <Files files={files} />;
  } catch (error) {
    if (error instanceof AxiosError && error.status === 403) {
      return (
        <h3 className="text-center">
          Похоже, у вас нет прав на доступ к диску, попробуйте{" "}
          <Link href="/login">авторизоваться</Link> еще раз
        </h3>
      );
    }
    throw error;
  }
}

interface FilesProps {
  files: FilesResourceList;
}

function Files({ files }: FilesProps) {
  return (
    <div>
      {files.items.map((file) => {
        return <div key={file.path}>{file.name}</div>;
      })}
    </div>
  );
}
