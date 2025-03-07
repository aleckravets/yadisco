import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  togglePlayPause,
  setVolume,
  stop,
} from "@/lib/features/player/playerSlice";
import { Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Volume } from "./Volume";
import { useEffect, useState } from "react";
import { useAudioCurrentTime } from "./useAudioCurrentTime";
import { TrackProgress } from "./TrackProgress";

export const MusicPlayer = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useAudioCurrentTime(audio);
  const dispatch = useAppDispatch();

  const { currentFile, status, volume } = useAppSelector(
    (state) => state.player
  );

  const isPlaying = status === "playing";

  useEffect(() => {
    if (currentFile) {
      console.log("new audio", currentFile);

      const audio = new Audio("/api/download?path=" + encodeURIComponent(currentFile.path));

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      if (isPlaying) {
        audio.play();
      }

      setAudio(audio);

      return () => {
        // audio should be paused to let it be garbage-collected
        audio.pause();
        setAudio(null);
      };
    }
  }, [currentFile]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [audio, volume]);

  useEffect(() => {
    if (audio) {
      const handleEnd = () => dispatch(stop());
      audio.addEventListener('ended', handleEnd);
      
      return () => {
        audio.removeEventListener('ended', handleEnd);
      }
    }
  }, [audio]);

  useEffect(() => {
    if (audio) {
      if (status === "playing") {
        audio.play();
      }
      if (status === "paused") {
        audio.pause();
      }
      if (status === "stopped") {
        audio.pause();
        setCurrentTime(0);
      }
    }
  }, [audio, status]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        {currentFile ? (
          <h2 className="text-2xl font-semibold tracking-tight">
            {currentFile.name}
          </h2>
        ) : (
          <h2 className="text-lg font-bold">No track selected</h2>
        )}
      </div>

      <div className="flex items-center gap-1 align-middle">
        <div className="flex">
          <Button
            onClick={() => dispatch(togglePlayPause())}
            title={isPlaying ? "Pause" : "Play"}
            variant="playerControl"
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            onClick={() => dispatch(stop())}
            title="Stop"
            variant="playerControl"
          >
            <Square />
          </Button>
        </div>
        <TrackProgress
          currentTime={currentTime}
          duration={duration}
          onChange={setCurrentTime}
        />
        <Volume
          value={volume}
          onChange={(value) => dispatch(setVolume(value))}
        />
      </div>
    </div>
  );
};
