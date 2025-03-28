import { auth } from "@/auth";
import StartPage from "@/components/start-page";

export default async function Page() {
  const session = await auth();

  return <StartPage user={session?.user} />;
}
