import { FileItem } from "@/app/api/files/route";
import styles from "./FileExplorer.module.scss";

interface FileExplorerItemProps {
  file: FileItem;
  onPlay?: (file: FileItem) => void;
}

export function FileExplorerItem({
  file,
  onPlay,
}: FileExplorerItemProps) {
  return (
    <li className={styles.fileItem} onClick={() => onPlay?.(file)}>
      <span className={styles.fileName}>{file.name}</span>
    </li>
  );
}
