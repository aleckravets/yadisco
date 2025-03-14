import { getAuthTokenCookie } from "@/server/authTokenCookie";
import { downloadFile } from "./downloadFile";
import { getDownloadLink } from "@/yandexDiskApi";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getAuthTokenCookie();
    const searchParams = req.nextUrl.searchParams;
    const path = searchParams.get("path");

    if (!path) {
      throw new Error("Invalid path");
    }

    const link = await getDownloadLink(token!, path);

    // todo use streaming
    const { status, body, headers } = await downloadFile(link);

    // Stream the file response
    return new NextResponse(body, {
      status,
      headers,
    });
  } catch {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
