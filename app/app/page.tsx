import { getFilesList } from "@/lib/yandexDisk/getFilesList";
import { AxiosError } from "axios";
import Link from "next/link";
import { FilesList } from "@/components/files-list";

export default async function Page() {
  try {
    const files = await getFilesList({ media_type: ["audio", "video"], limit: 100 });
    return <FilesList files={files} />;
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
