import { signIn } from "@/auth";
import Image from "next/image";

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("yandex");
      }}
    >
      <button type="submit" className="cursor-pointer">
        <Image
          src="/signin-with-yandex.svg"
          alt="Войти с Яндекс ID"
          width={228}
          height={44}
        />
      </button>
    </form>
  );
}
