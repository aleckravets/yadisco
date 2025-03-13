import { BASE_URL } from "@/constants";
import { AUTH_TOKEN } from "@/utils/authToken";
import { getAccessToken } from "@/yandexDiskApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  try {
    if (!code) {
      throw new Error("Failed to get access token, code is empty");
    }

    const data = await getAccessToken(code);

    if (data.error) {
      throw new Error(data.error_description);
    }

    const res = new NextResponse(getSendSuggestTokenPage(), {
      headers: { "Content-Type": "text/html" },
    });

    res.cookies.set(AUTH_TOKEN, data.access_token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return res;
  } catch (error) {
    return new NextResponse(getSendSuggestTokenPage(true), {
      headers: { "Content-Type": "text/html" },
    });
  }
}

// https://yandex.ru/dev/id/doc/ru/suggest/script-sdk-suggest-token
function getSendSuggestTokenPage(error = false) {
  return `
<!doctype html>
<html lang="ru">

<head>
   <meta charSet="utf-8" />
   <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, shrink-to-fit=no, viewport-fit=cover'>
   <meta http-equiv='X-UA-Compatible' content='ie=edge'>
   <script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"></script>
</head>

<body>
   <script>
      window.onload = function() {
         var data = { error: ${error}};
         if (!data.error) {
           delete data.error;
         }
         window.YaSendSuggestToken('${BASE_URL}', data);
      };
   </script>
</body>

</html>
  `;
}
