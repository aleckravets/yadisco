import { FileExplorer } from "./components/FileExplorer/FileExplorer";
import { Player } from "./components/Player/Player";
import { Playlist } from "./components/Playlist/Playlist";

export default function Home() {
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
