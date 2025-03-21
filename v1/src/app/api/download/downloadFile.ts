export async function downloadFile(downloadUrl: string): Promise<Response> {
  try {
    const res = await fetch(downloadUrl);

    if (!res.ok) {
      throw new Error(
        `Failed to download file: ${res.status}: ${res.statusText}`
      );
    }

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
