import { nextTrack, prevTrack, togglePlayPause } from "@/lib/features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const Player = () => {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector(
    (state) => state.player
  );

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