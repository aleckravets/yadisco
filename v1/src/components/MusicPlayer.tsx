import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  togglePlayPause,
  setVolume,
  stop,
} from "@/lib/features/playerSlice";
import { Play, Pause, Square } from "lucide-react";
import { Button } from "@/ui-kit/button";
import { Volume } from "./Volume";
import { useEffect, useState } from "react";
import { TrackProgress } from "./TrackProgress";

export const MusicPlayer = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const dispatch = useAppDispatch();

  const { currentFile, status, volume } = useAppSelector(
    (state) => state.player
  );

  const isPlaying = status === "playing";

  useEffect(() => {
    const audio = new Audio();

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("ended", () => dispatch(stop()));

    setAudio(audio);

    return () => audio.pause();
  }, []);

  useEffect(() => {
    if (audio && status === "playing") {
      let animationFrameId: number;

      const updateCurrentTime = () => {
        setCurrentTime(audio.currentTime);
        animationFrameId = requestAnimationFrame(updateCurrentTime);
      };

      updateCurrentTime();

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [audio, status]);

  useEffect(() => {
    if (audio && currentFile) {
      audio.pause();

      audio.src = "/api/download?path=" + encodeURIComponent(currentFile.path);

      if (isPlaying) {
        audio.play();
      }
    }
  }, [audio, currentFile]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [audio, volume]);

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

  const handleSeek = (time: number) => {
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  }

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
          onChange={handleSeek}
        />
        <Volume
          value={volume}
          onChange={(value) => dispatch(setVolume(value))}
        />
      </div>
    </div>
  );
};
