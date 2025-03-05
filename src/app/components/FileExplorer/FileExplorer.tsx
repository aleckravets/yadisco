import { addTrack, playTrack } from "@/lib/features/player/playerSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./FileExplorer.module.scss";
import { FileItem } from "@/app/api/files/route";
import { FileExplorerItem } from "./FileExplorerItem";

export const FileExplorer = () => {
  const [files, setFiles] = useState<FileItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files");
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data = (await response.json()) as { items: FileItem[] };

        setFiles(data.items);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleAddItem = (file: FileItem) => {
    dispatch(
      addTrack({
        fileId: file.path,
        title: file.name,
        url: `/api/download?path=${encodeURIComponent(file.path)}`,
      })
    );
  };

  const handlePlayItem = (file: FileItem) => {
    dispatch(
      playTrack({
        fileId: file.path,
        title: file.name,
        url: `/api/download?path=${encodeURIComponent(file.path)}`,
      })
    );
  };

  if (loading) return <p>Loading...</p>;

  if (!files) return <p>No files found.</p>;

  return (
    <div className={styles.fileExplorer}>
      <h2>📂 Yandex Disk - Audio Files</h2>
      <ul className={styles.fileList}>
        {files.map((file) => (
          <FileExplorerItem
            key={file.id}
            file={file}
            onAdd={() => handleAddItem(file)}
            onPlay={() => handlePlayItem(file)}
          />
        ))}
      </ul>
    </div>
  );
};
