"use client";
import { FileExplorer } from "../FileExplorer/FileExplorer";
import { MusicPlayer } from "../MusicPlayer";
import { Playlist } from "../Playlist/Playlist";
import styles from "./PlayerApp.module.scss";

export function PlayerApp() {
  return (
    <div className={styles.playerApp}>
      <aside className={styles.sidebar}>
        <FileExplorer />
      </aside>
      <main className={styles.mainContent}>
        <MusicPlayer />
        <Playlist />
      </main>
    </div>
  );
}
