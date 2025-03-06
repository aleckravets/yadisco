import { useEffect, useState } from "react";
import { Howl } from "howler";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  togglePlayPause,
  setVolume,
  stop,
  toggleLoop,
} from "@/lib/features/player/playerSlice";
import { Play, Pause, Square, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume } from "./Volume";

let sound: Howl | null = null;

export const MusicPlayer = () => {
  const dispatch = useAppDispatch();
  const {
    currentTrack,
    status,
    volume,
  } = useAppSelector((state) => state.player);
  const [progress, setProgress] = useState(0);

  const isPlaying = status === "playing";
  const isStopped = status === "stopped";

  useEffect(() => {
    if (currentTrack) {
      if (sound) sound.stop();
      sound = new Howl({
        src: [currentTrack.url],
        html5: true,
        volume,
        onend: () => dispatch(togglePlayPause()),
        onplay: updateProgress,
      });

      if (isPlaying) sound.play();
    }

    return () => {
      if (sound) sound.stop();
    };
  }, [currentTrack]);

  useEffect(() => {
    if (sound) {
      isPlaying ? sound.play() : sound.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (sound) sound.volume(volume);
  }, [volume]);

  const updateProgress = () => {
    if (sound) {
      setProgress((sound.seek() / sound.duration()) * 100);
      requestAnimationFrame(updateProgress);
    }
  };

  const handleSeek = (value: number[]) => {
    if (sound) {
      const seekTime = (value[0] / 100) * sound.duration();
      sound.seek(seekTime);
      setProgress(value[0]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        {currentTrack ? (
          <h2 className="text-2xl font-semibold tracking-tight">{currentTrack.title}</h2>
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
        <Slider value={[progress]} onValueChange={handleSeek} max={100} />
        <Volume
          value={volume}
          onChange={(value) => dispatch(setVolume(value))}
        />
      </div>
    </div>
  );
};
