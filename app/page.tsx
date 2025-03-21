import { auth } from "@/auth";
import SignIn from "@/components/sing-in";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-2xl font-bold text-gray-900">Yadisco</h1>
        <p className="text-gray-600 text-xl mt-2 mb-6">
          Слушайте любимую музыку с Яндекс.Диска
        </p>
        <SignIn />

        <pre>{JSON.stringify(session, null, 2)}</pre>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/aleckravets/yadisco"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github-mark.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          />
          GitHub
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/aleckravets/yadisco/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Сообщить о проблеме
        </a>
      </footer>
    </div>
  );
}
