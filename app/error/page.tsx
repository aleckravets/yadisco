import Link from "next/link";

export default async function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          <Link href="/">Yadisco</Link>
        </h1>

        <h3>Ошибка авторизаци</h3>

        <Link
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Попробовать еще раз
        </Link>
      </main>
    </div>
  );
}
