import ShowError from "@/components/show-error";
import Link from "next/link";

export default async function Page() {
  return (
    <ShowError
      title="Ошибка авторизации, попробуйте еще раз"
      content={() => (
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          На страницу авторизации
        </Link>
      )}
    />
  );
}
