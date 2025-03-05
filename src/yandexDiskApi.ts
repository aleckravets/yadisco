const baseUrl = "https://cloud-api.yandex.net/v1/disk";

export interface YandexDiskItem {
  resource_id: string;
  name: string;
  path: string;
  type: string;
  size?: number;
  created?: string;
  modified?: string;
  media_type: string;
  mime_type: string;
}

export async function getAccessToken(code: string) {
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

export async function isAuthTokenValid(token: string) {
  try {
    const response = await fetch(`${baseUrl}/`, {
      method: "GET",
      headers: { Authorization: `OAuth ${token}` },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

export async function getAudioFiles(token: string): Promise<YandexDiskItem[]> {
  try {
    const response = await fetch(
      `${baseUrl}/resources/files?limit=100&media_type=audio`,
      {
        method: "GET",
        headers: { Authorization: `OAuth ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get audio files: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.items ?? [];
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
}

export async function getDownloadLink(token: string, path: string): Promise<string> {
  try {
    const response = await fetch(
      `${baseUrl}/resources/download?path=${encodeURIComponent(path)}`,
      {
        method: "GET",
        headers: { Authorization: `OAuth ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get download link: ${response.status} ${response.statusText}`);
    }

    const {href} = await response.json();
    return href;
  } catch (error) {
    console.error(error);
    throw error;
  }
}