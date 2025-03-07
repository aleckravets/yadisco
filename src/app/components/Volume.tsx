import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 as VolumeIcon, VolumeOff } from "lucide-react";

interface VolumeProps {
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export function Volume({ value, onChange, disabled }: VolumeProps) {
  const [lastValue, setLastValue] = useState(value);

  const handleVolumeChangeComplete = (value: number) => {
    if (value > 0) {
      setLastValue(value);
    }
  };

  const toggleMute = () => {
    if (value === 0) {
      onChange?.(lastValue);
    } else {
      onChange?.(0);
    }
  };

  return (
    <div className="w-35 flex items-center">
      <Button
        onClick={toggleMute}
        title={value === 0 ? "Unmute" : "Mute"}
        variant={"link"}
        className="cursor-pointer"
        disabled={disabled}
      >
        {value === 0 ? <VolumeOff /> : <VolumeIcon />}
      </Button>
      <Slider
        value={[value ?? 1]}
        max={1}
        step={0.01}
        onValueChange={(value) => onChange?.(value[0])}
        onValueCommit={(value) => handleVolumeChangeComplete(value[0])}
        title="Volume"
        className="cursor-pointer"
        disabled={disabled}
      />
    </div>
  );
}
