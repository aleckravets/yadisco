import {
  playTrackByIndex,
  removeTrack,
} from "@/lib/features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { PlaylistItem } from "./PlaylistItem";

export const Playlist = () => {
  const dispatch = useAppDispatch();
  const { playlist, currentTrackIndex } = useAppSelector(
    (state) => state.player
  );

  return (
    <div className="playlist">
      <h2>🎶 Playlist</h2>
      {playlist .map((track, index) => (
        <PlaylistItem
          key={track.id}
          track={track}
          isActive={index === currentTrackIndex}
          onPlay={() => dispatch(playTrackByIndex(index))}
          onDelete={() => dispatch(removeTrack(track.id))}
        />
      ))}
      {playlist.length === 0 && <p>No tracks in playlist</p>}
    </div>
  );
};
