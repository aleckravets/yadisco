import { getAuthToken } from "@/utils/authToken";
import { getAudioFiles } from "@/yandexDiskApi";
import { FileListItem } from "./FileListItem";

export async function FileList() {
  const token = await getAuthToken();
  const files = await getAudioFiles(token!);

  return (
    <div>
      {files.map(file => (
        <FileListItem key={file.path} file={file} />
      ))}
    </div>
  );
}
