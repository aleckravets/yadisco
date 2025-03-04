import { AudioPlayer } from "./AudioPlayer";
import { FileList } from "./FilesList";
import { Playlist } from "./Playlist";

export default function PlayerApp() {
  return (
    <div>
      <div><FileList /></div>
      <div>
        <div><Playlist /></div>
        <div>
          <AudioPlayer />
        </div>
      </div>
    </div>
  );
}
