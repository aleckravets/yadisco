import { playTrack as playFile } from "@/lib/features/player/playerSlice";
import styles from "./FileExplorer.module.scss";
import { FileItem } from "@/app/api/files/route";
import { FileExplorerItem } from "./FileExplorerItem";
import { useAppDispatch } from "@/lib/hooks";
import { useGetFilesQuery } from "@/lib/features/files/filesApiSlice";

export const FileExplorer = () => {
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
          <FileExplorerItem
            key={file.id}
            file={file}
            onPlay={() => handlePlayItem(file)}
          />
        ))}
      </ul>
    </div>
  );
};
