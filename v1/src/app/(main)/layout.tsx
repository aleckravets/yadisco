"use client";
import { Folder, Music } from "lucide-react";
import { MusicPlayer } from "@/components/MusicPlayer";
import Link from "next/link";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <div className="flex h-screen w-full max-w-300 mx-auto">
        <aside className="bg-white w-50 h-full flex flex-col">
          <div className="p-4 text-xl font-bold border-b">🎵 Yadisco</div>

          <nav className="flex-1 p-4 space-y-2">
            <SidebarItem
              icon={<Folder size={20} />}
              label="Моя музыка"
              href={"/"}
            />
            <SidebarItem
              icon={<Music size={20} />}
              label="Плейлисты"
              href={"/playlist"}
            />
            {/* <SidebarItem icon={<Settings size={20} />} label="Settings" /> */}
          </nav>

          <div className="p-4 text-center text-sm text-gray-500 border-t">
            &copy; {new Date().getFullYear()} Yadisco
          </div>
        </aside>
        <main className="bg-white h-full flex-1 ml-1 flex flex-col justify-end">
          <div className="flex-1 p-4">{children}</div>
          <div className="p-4">
            <MusicPlayer />
          </div>
        </main>
      </div>
    </ErrorBoundary>
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
