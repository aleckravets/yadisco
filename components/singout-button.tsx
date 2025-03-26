import { signOut } from "@/auth";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { User } from "next-auth";

interface Props {
  user: User;
}

export function UserInfo({ user }: Props) {
  const src = user.image ?? "/user.svg";

  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit" className="flex items-center">
        <img src={src} className="w-14 h-14 rounded-full object-cover" />
        <ArrowRightStartOnRectangleIcon
          className="size-6 cursor-pointer"
          title="Выйти"
        />
      </button>
    </form>
  );
}
