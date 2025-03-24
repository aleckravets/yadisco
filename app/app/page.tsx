import { auth } from "@/auth";
import { SignOut } from "@/components/singout-button";
import { getAllFiles } from "@/lib/yandexDisk/getAllFiles";

export default async function Page() {
  const files = await getAllFiles();

  return (
    <pre>{JSON.stringify(files, null, 2)}</pre>
  );
}
