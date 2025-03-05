import { playTrack, removeTrack } from "@/lib/features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const Playlist = () => {
  const dispatch = useAppDispatch();
  const { playlist, currentTrackIndex } = useAppSelector(
    (state) => state.player
  );

  return (
    <div className="playlist">
      <h2>🎶 Playlist</h2>
      {playlist.length === 0 ? (
        <p>No tracks in playlist</p>
      ) : (
        <ul>
          {playlist.map((track, index) => (
            <li
              key={track.id}
              className={currentTrackIndex === index ? "active" : ""}
              onClick={() => dispatch(playTrack(index))}
            >
              <span>
                {track.title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent track play on remove click
                  dispatch(removeTrack(track.id));
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .playlist {
          border: 1px solid #ddd;
          padding: 16px;
          border-radius: 8px;
          max-width: 300px;
          background: #f9f9f9;
        }
        h2 {
          margin-bottom: 10px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          cursor: pointer;
          border-bottom: 1px solid #ddd;
        }
        li.active {
          background: #0070f3;
          color: white;
          font-weight: bold;
        }
        button {
          background: none;
          border: none;
          cursor: pointer;
          color: red;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};
