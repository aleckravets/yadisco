import { FileItem } from "@/app/api/files/route";
import styles from "./FileList.module.scss";

interface FileListItemProps {
  file: FileItem;
  onPlay?: (file: FileItem) => void;
}

export function FileListItem({
  file,
  onPlay,
}: FileListItemProps) {
  return (
    <li className={styles.fileItem} onClick={() => onPlay?.(file)}>
      <span className={styles.fileName}>{file.name}</span>
    </li>
  );
}
