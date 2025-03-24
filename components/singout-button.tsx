import { signOut } from "@/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({redirectTo: "/"});
      }}
    >
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        Выйти
      </button>
    </form>
  );
}
