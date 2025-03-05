"use client";
import { FileExplorer } from "../FileExplorer/FileExplorer";
import { Player } from "../Player/Player";
import { Playlist } from "../Playlist/Playlist";

export function PlayerApp() {
  return (
    <div>
      <div>
        <FileExplorer />
      </div>
      <div>
        <div>
          <Player />
        </div>
        <div>
          <Playlist />
        </div>
      </div>
    </div>
  );
}
