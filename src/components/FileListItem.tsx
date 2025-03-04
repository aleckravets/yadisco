'use client';
import { YandexDiskItem } from "@/yandexDiskApi";

export function FileListItem({ file }: { file: YandexDiskItem; }) {
  return (
    <div>
      <div>{file.name}</div>
    </div>
  )
}
