import { nextTrack, prevTrack, togglePlayPause } from "@/lib/features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const Player = () => {
  const dispatch = useAppDispatch();
  const { playlist, currentTrackIndex, isPlaying } = useAppSelector(
    (state) => state.player
  );

  const currentTrack =
    currentTrackIndex !== null ? playlist[currentTrackIndex] : null;

  return (
    <div className="player">
      {currentTrack ? (
        <>
          <h2>
            {currentTrack.title}
          </h2>
          <button onClick={() => dispatch(prevTrack())}>⏮️ Prev</button>
          <button onClick={() => dispatch(togglePlayPause())}>
            {isPlaying ? "⏸️ Pause" : "▶️ Play"}
          </button>
          <button onClick={() => dispatch(nextTrack())}>⏭️ Next</button>
        </>
      ) : (
        <p>No track playing</p>
      )}
    </div>
  );
};