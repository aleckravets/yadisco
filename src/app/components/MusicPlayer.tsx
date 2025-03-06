import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  togglePlayPause,
  setVolume,
  stop,
} from "@/lib/features/player/playerSlice";
import { Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume } from "./Volume";
import { useEffect, useRef, useState } from "react";

export const MusicPlayer = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useAudioCurrentTime(audio);
  const [seeking, setSeeking] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const {
    currentTrack: currentFile,
    status,
    volume,
  } = useAppSelector((state) => state.player);

  useEffect(() => {
    if (currentFile) {
      const audio = new Audio(
        "/api/download?path=" + encodeURIComponent(currentFile.path)
      );

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      audio.play();

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

  const isPlaying = status === "playing";

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
        <Slider
          value={[seeking ?? currentTime!]}
          onValueChange={(values) => setSeeking(values[0])}
          onValueCommit={(values) => {
            setSeeking(null);
            setCurrentTime(values[0]);
          }}
          max={duration}
        />
        <Volume
          value={volume}
          onChange={(value) => dispatch(setVolume(value))}
        />
      </div>
    </div>
  );
};

export const useAudioCurrentTime = (audio: HTMLAudioElement | null) => {
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
      const updateCurrentTime = () => {
          if (audio) {
              setCurrentTime(audio.currentTime);
          }
          animationFrameId.current = requestAnimationFrame(updateCurrentTime);
      };

      animationFrameId.current = requestAnimationFrame(updateCurrentTime);

      return () => {
          if (animationFrameId.current) {
              cancelAnimationFrame(animationFrameId.current);
          }
      };
  }, [audio]);

  const setter = (time: number) => {
      if (audio) {
          audio.currentTime = time;
          setCurrentTime(time);
      }
  }

  return [currentTime, setter] as const;
};