import { FileItem } from "@/app/api/files/route";
import styles from "./FileExplorer.module.scss";

interface FileExplorerItemProps {
  file: FileItem;
  onPlay: () => void;
}

export function FileExplorerItem({
  file,
  onPlay,
}: FileExplorerItemProps) {
  return (
    <li className={styles.fileItem} onClick={onPlay}>
      <span className={styles.fileName}>{file.name}</span>
    </li>
  );
}
