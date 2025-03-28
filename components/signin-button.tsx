import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  redirectTo?: string;
}

export default function SignInButton({ redirectTo = "/disk" }: Props) {
  return (
    <form
      action={async () => {
        "use server";

        try {
          await signIn("yandex", {
            redirectTo,
          });
        } catch (error) {
          // Signin can fail for a number of reasons, such as the user
          // not existing, or the user not having the correct role.
          // In some cases, you may want to redirect to a custom error
          if (error instanceof AuthError) {
            return redirect("/error");
          }

          // Otherwise if a redirects happens Next.js can handle it
          // so you can just re-thrown the error and let Next.js handle it.
          // Docs:
          // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
          throw error;
        }
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
