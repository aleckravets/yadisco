import { Track } from "@/lib/features/player/playerSlice";

interface PlaylistItemProps {
  track: Track;
  isActive: boolean;
  onPlay: () => void;
  onDelete: () => void;
}

export function PlaylistItem({ track, onPlay, onDelete }: PlaylistItemProps) {
  return (
    <div onClick={onPlay}>
      <span>{track.title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent track play on remove click
          onDelete();
        }}
      >
        ❌
      </button>
    </div>
  );
}
