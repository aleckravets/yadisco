import { NextResponse } from "next/server";
import { getAuthToken } from "@/utils/authToken";
import { getAudioFiles } from "@/yandexDiskApi";

export async function GET() {
  const token = await getAuthToken();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const audioFiles = await getAudioFiles(token);

    // Transform the items to include download URLs
    const items = audioFiles.map((item) => ({
      name: item.name,
      file: `/api/download?path=${encodeURIComponent(item.path)}`,
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
