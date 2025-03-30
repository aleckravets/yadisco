import { auth } from "@/auth";
import ky from "ky";

export const yandexDiskApi = ky.extend({
  prefixUrl: "https://cloud-api.yandex.net/v1/disk",
  hooks: {
    beforeRequest: [
      async (request) => {
        const session = await auth();
        if (session?.accessToken) {
          request.headers.set("Authorization", `OAuth ${session.accessToken}`);
        }
      }
    ],
  },
});
