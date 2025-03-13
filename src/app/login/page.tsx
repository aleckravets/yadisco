"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { BASE_URL, CLIENT_ID } from "@/constants";
import { useRouter } from "next/navigation";

export const REDIRECT_URI = `${BASE_URL}/oauth/code`;

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const buttonContainerId = "ya-button-container";

  useEffect(() => {
    const initYaWidget = async () => {
      const { YaAuthSuggest } = window as any;

      if (YaAuthSuggest) {
        try {
          const { handler } = await new YaAuthSuggest.init(
            {
              client_id: CLIENT_ID,
              response_type: "code",
              redirect_uri: REDIRECT_URI,
            },
            BASE_URL,
            {
              view: "button",
              parentId: buttonContainerId,
              buttonSize: "m",
              buttonView: "main",
              buttonTheme: "light",
              buttonBorderRadius: "4",
            }
          );

          const {
            extraData: { error },
          } = await handler();

          if (error) {
            throw "Authorization error";
          }
          router.push("/");
        } catch (error) {
          setError(true);
          console.error(error);
        }
      }
    };

    initYaWidget();
  }, []);

  return (
    <>
      <Script
        src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"
        strategy="beforeInteractive"
      />
      <div className="flex w-screen h-screen items-center justify-center bg-white">
        <div className="w-full max-w-[300px] mx-auto text-center">
          <img
            src="/icon.svg"
            alt="Yadisco"
            className="w-16 h-16 mx-auto mb-4"
          />

          <h1 className="text-2xl font-semibold text-gray-900">Yadisco</h1>
          <p className="text-gray-600 text-sm mt-2 mb-6">
            Слушайте любимую музыку с Яндекс.Диска
          </p>

          {error && (
            <p className="text-red-500">Что-то пошло не. Попробуйте позже.</p>
          )}

          <div id={buttonContainerId}></div>
        </div>
      </div>
    </>
  );
}
