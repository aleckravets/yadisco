import { setAuthToken } from "@/utils/authToken";
import { getAccessToken } from "@/yandexDiskApi";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ msg: "Code can't be empty" });
  }

  const data = await getAccessToken(code);

  if (data.error) {
    return NextResponse.json(data, { status: 400 });
  }

  const res = NextResponse.redirect(new URL("/", req.url));
  setAuthToken(res, data.access_token);

  return res;
}
