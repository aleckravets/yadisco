import { FileItem } from "@/app/api/files/route";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Status = "playing" | "paused" | "stopped";

interface PlayerState {
  currentTrack: FileItem | null;
  status: Status;
  volume: number;
}

const initialState: PlayerState = {
  currentTrack: null,
  status: "stopped",
  volume: 1,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    togglePlayPause: (state) => {
      if (state.currentTrack) {
        state.status = state.status === "playing" ? "paused" : "playing";
      }
    },
    stop: (state) => {
      state.status = "stopped";
    },
    playTrack: (state, action: PayloadAction<FileItem>) => {
      state.currentTrack = action.payload;
      state.status = "playing";
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const {
  playTrack,
  togglePlayPause,
  setVolume,
  stop,
} = playerSlice.actions;
