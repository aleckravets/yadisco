// import { FolderIcon, Music } from "@heroicons/react/24/outline";
// import { MusicPlayer } from "../components/MusicPlayer";
import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";
import { UserMenu } from "@/components/user-menu";
import { FolderIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";

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
    <div className="flex h-screen w-full max-w-6xl mx-auto">
      <aside className="w-52 h-full flex flex-col bg-yellow-100">
        <div className="h-6 flex gap-2 p-8 text-xl font-bold items-center justify-center">
          <MusicalNoteIcon className="size-6" /> Yadisco
        </div>

        <div className="flex-1"></div>

        {/* <nav className="flex-1 p-4 space-y-2">
          <SidebarItem
            icon={<FolderIcon className="size-6" />}
            label="Моя музыка"
            href={"/app"}
          />
        </nav> */}

        <div className="h-20 p-4 justify-center">
          <UserMenu user={session.user} />
        </div>
      </aside>
      <div className="flex-1 flex flex-col bg-gray-100">
        <main className="flex-1 overflow-y-auto w-full p-4">
          {children}
        </main>
        <footer className="h-16 bg-gray-400 text-white flex items-center justify-center">
          Music player
        </footer>
      </div>
    </div>
  );
}

const SidebarItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => (
  <div className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200">
    {icon}
    <Link href={href}>{label}</Link>
  </div>
);
