import { FileItem } from "@/app/api/files/route";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Status = "playing" | "paused" | "stopped";

interface PlayerState {
  currentFile: FileItem | null;
  status: Status;
  volume: number;
}

const initialState: PlayerState = {
  currentFile: null,
  status: "stopped",
  volume: 1,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    togglePlayPause: (state) => {
      if (state.currentFile) {
        state.status = state.status === "playing" ? "paused" : "playing";
      }
    },
    stop: (state) => {
      state.status = "stopped";
    },
    playFile: (state, action: PayloadAction<FileItem>) => {
      state.currentFile = action.payload;
      state.status = "playing";
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const { playFile, togglePlayPause, setVolume, stop } =
  playerSlice.actions;
