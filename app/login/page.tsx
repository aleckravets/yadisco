import Link from "next/link";
import SignInButton from "@/components/signin-button";

interface SearchParams {
  redirectTo: string;
  [key: string]: string | string[] | undefined;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: Props) {
  const { redirectTo } = await searchParams;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          <Link href="/">Yadisco</Link>
        </h1>

        <SignInButton redirectTo={redirectTo || "/app"} />
      </main>
    </div>
  );
}
