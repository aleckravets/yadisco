import { signOut } from "@/auth";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { User } from "next-auth";

interface Props {
  user: User;
}

export function UserMenu({ user }: Props) {
  const src = user.image ?? "/user.svg";

  return (
    <form
      action={async () => {
        "use server";
        await signOut({redirectTo: "/"});
      }}
      className="flex items-center justify-center"
    >
      <img src={src} className="size-14 rounded-full object-cover" />

      <button type="submit">
        <ArrowRightStartOnRectangleIcon
          className="size-6 cursor-pointer"
          title="Выйти"
        />
      </button>
    </form>
  );
}
