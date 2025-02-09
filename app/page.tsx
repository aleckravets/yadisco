// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import AudioPlayer from "@/app/components/AudioPlayer";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/check-auth")
      .then((res) => res.json())
      .then((data) => setIsAuthorized(data.authorized));
  }, []);

  if (isAuthorized === null) {
    return <p>Loading...</p>;
  }

  return isAuthorized ? (
    <AudioPlayer />
  ) : (
    <div>
      <h1>Please Log In</h1>
      <a href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID}`}>
        Login with Yandex
      </a>
    </div>
  );
}
