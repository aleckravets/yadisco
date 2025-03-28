import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { getResourceMetadata } from "@/lib/yandexDisk/getResourceMetadata";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const path = searchParams.get("path") || "";

  try {
    const filesListResponse = await getResourceMetadata({path});
    return NextResponse.json(filesListResponse);
  } catch (error: unknown) {
    console.log(error instanceof AxiosError, error);
    if (error instanceof AxiosError) {
      const { status } = error;
      if (status === 401) {
        return NextResponse.json({ error: "Unauthorized" }, { status });
      }
    }

    console.error(`Failed to get resource metadata for path "${path}"`, error);

    return NextResponse.json({error: "Request failed"}, { status: 500 });
  }
}
