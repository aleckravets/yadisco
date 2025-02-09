import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ msg: "Code can't be empty" });
    }
    
    const data = await getAccessToken(code);
    
    if (data.error) {
        return NextResponse.json(data, { status: 400 });
    }

    const res = NextResponse.redirect(new URL('/', req.url));
    res.cookies.set("token", data.access_token, { httpOnly: true, secure: true, path: "/" });
    
    return res;
}

async function getAccessToken(code: string) {
    const CLIENT_ID = process.env.YANDEX_CLIENT_ID as string;
    const CLIENT_SECRET = process.env.YANDEX_CLIENT_SECRET as string;

    const response = await fetch("https://oauth.yandex.ru/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }),
    });

    return response.json();
}