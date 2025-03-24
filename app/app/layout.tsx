// import { FolderIcon, Music } from "@heroicons/react/24/outline";
// import { MusicPlayer } from "../components/MusicPlayer";
import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";
import { SignOut } from "@/components/singout-button";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    return <div>Unautharized</div>;
  }

  const { accessToken, user } = session;

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="w-full max-w-4xl flex flex-col flex-1">
        <header className="p-4 text-center">
          {/* <img src={user.image!} alt={user.name!} width={50} height={50} /> */}
          <span>{user.name}</span>
          <SignOut />
        </header>

        <main className="flex-1 p-6">{children}</main>

        <footer className="p-4 text-center">Footer</footer>
      </div>
    </div>
  );
}
