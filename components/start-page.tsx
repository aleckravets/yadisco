import Image from "next/image";
import SignInButton from "./signin-button";
import { User } from "next-auth";
import Link from "next/link";
import { signOut } from "@/auth";

interface Props {
  user?: User;
}

export default async function StartPage({ user }: Props) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-2xl font-bold text-gray-900">Yadisco</h1>
        <p className="text-gray-600 text-xl mt-2 mb-6">
          Слушайте музыку с Яндекс.Диска
        </p>

        {user ? <Authorized user={user!} /> : <SignInButton />}
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

function Authorized({ user }: Required<Props>) {
  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center">
      <Image
        src={user.image || "/user.svg"}
        width="56"
        height="56"
        alt="Изображение пользователя"
        className="size-14 rounded-full object-cover"
      />
      <div>Вы вошли как {user.name}</div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        <button type="submit">Выйти</button>
      </form>

      <Link
        href="/disk"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        Перейти к музыке
      </Link>
    </div>
  );
}
