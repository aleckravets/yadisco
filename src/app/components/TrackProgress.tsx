import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface TrackProgressProps {
  currentTime: number;
  duration: number;
  onChange: (value: number) => void;
}

export function TrackProgress({
  currentTime,
  duration,
  onChange,
}: TrackProgressProps) {
  const [value, setValue] = useState<number | null>(null);

  const handleOnChange = (value: number) => {
    setValue(value);
  };

  const handleOnCommit = (value: number) => {
    setValue(null);
    onChange(value);
  };

  return (
    <Slider
      value={[value ?? currentTime]}
      max={duration}
      onValueChange={(values) => handleOnChange(values[0])}
      onValueCommit={(values) => handleOnCommit(values[0])}
      className="cursor-pointer"
    />
  );
}