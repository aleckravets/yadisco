import { FileItem } from "@/app/api/files/route";
import { Play, Plus } from "lucide-react";
import styles from "./FileExplorer.module.scss";

interface FileExplorerItemProps {
  file: FileItem;
  onAdd: () => void;
  onPlay: () => void;
}

export function FileExplorerItem({
  file,
  onAdd,
  onPlay,
}: FileExplorerItemProps) {
  return (
    <li className={styles.fileItem} onClick={onPlay}>
      <span className={styles.fileName}>{file.name}</span>
      <div className={styles.actions}>
        <button
          className={styles.addButton}
          onClick={(event) => {
            event.stopPropagation();
            onAdd();
          }}
        >
          <Plus size={20} />
        </button>
      </div>
    </li>
  );
}
