import { NextResponse } from "next/server";
import { getAuthToken } from "@/utils/authToken";
import { getAudioFiles } from "@/yandexDiskApi";

export interface FileItem {
  id: string;
  name: string;
  path: string;
}

export async function GET() {
  const token = await getAuthToken();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const audioFiles = await getAudioFiles(token);

    const items = audioFiles.map<FileItem>((item) => ({
      id: item.resource_id,
      name: item.name,
      path: item.path,
    }));

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching audio files:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio files" },
      { status: 500 }
    );
  }
}
