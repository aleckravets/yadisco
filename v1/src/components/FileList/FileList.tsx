"use client";
import { playFile } from "@/lib/features/playerSlice";
import styles from "./FileList.module.scss";
import { FileItem } from "@/app/api/files/route";
import { FileListItem } from "./FileListItem";
import { useAppDispatch } from "@/lib/hooks";
import { useGetFilesQuery } from "@/lib/features/filesApiSlice";

export const FileList = () => {
  const { data, isError, isLoading } = useGetFilesQuery();
  const dispatch = useAppDispatch();

  const handlePlayItem = (file: FileItem) => {
    dispatch(playFile(file));
  };

  if (isLoading) return <p>Загрузка...</p>;

  if (isError) return <p>При загрузке файлов произошла ошибка</p>;

  const files = data?.items ?? [];

  if (!files.length) return <p>У вас нет музыки на Яндекс.Диске</p>;

  return (
    <div className="">
      <h2 className="mb-2 border-b pb-4">📂 Моя Музыка</h2>
      <ul className={styles.fileList}>
        {files.map((file) => (
          <FileListItem key={file.id} file={file} onPlay={handlePlayItem} />
        ))}
      </ul>
    </div>
  );
};
