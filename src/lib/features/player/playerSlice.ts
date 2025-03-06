import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Track {
  id: number;
  fileId: string;
  title: string;
  url: string;
}

export type Status = "playing" | "paused" | "stopped";

interface PlayerState {
  playlist: Track[];
  currentTrack: Track | null;
  currentTrackIndex: number | null;
  status: Status;
  volume: number;
  loop: boolean;
}

const initialState: PlayerState = {
  playlist: [],
  currentTrack: null,
  currentTrackIndex: null,
  status: "stopped",
  volume: 1,
  loop: false,
};

let trackId = 0;

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.playlist = action.payload;
      state.currentTrackIndex = action.payload.length > 0 ? 0 : null;
    },
    playTrackByIndex: (state, action: PayloadAction<number>) => {
      state.currentTrackIndex = action.payload;
      state.currentTrack = state.playlist[action.payload];
      state.status = "playing";
    },
    togglePlayPause: (state) => {
      if (state.currentTrack) {
        state.status = state.status === "playing" ? "paused" : "playing";
      }
    },
    stop: (state) => {
      state.status = "stopped";
    },
    nextTrack: (state) => {
      if (state.currentTrackIndex !== null && state.playlist.length > 0) {
        state.currentTrackIndex =
          (state.currentTrackIndex + 1) % state.playlist.length;
        state.currentTrack = state.playlist[state.currentTrackIndex];
        state.status = "playing";
      }
    },
    prevTrack: (state) => {
      if (state.currentTrackIndex !== null && state.playlist.length > 0) {
        state.currentTrackIndex =
          (state.currentTrackIndex - 1 + state.playlist.length) %
          state.playlist.length;
        state.currentTrack = state.playlist[state.currentTrackIndex];
        state.status = "playing";
      }
    },
    addTrack: (state, action: PayloadAction<Omit<Track, "id">>) => {
      state.playlist.push({
        id: trackId++,
        ...action.payload,
      });
    },
    playTrack: (state, action: PayloadAction<Omit<Track, "id">>) => {
      state.playlist = [
        {
          id: trackId++,
          ...action.payload,
        },
      ];
      state.currentTrackIndex = 0;
      state.currentTrack = state.playlist[0];
      state.status = "playing";
    },
    removeTrack: (state, action: PayloadAction<number>) => {
      state.playlist = state.playlist.filter(
        (track) => track.id !== action.payload
      );
      if (
        state.currentTrackIndex !== null &&
        state.currentTrackIndex >= state.playlist.length
      ) {
        state.currentTrackIndex = state.playlist.length - 1;
      }
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    toggleLoop: (state) => {
      state.loop = !state.loop;
    }
  },
});

export const {
  setPlaylist,
  playTrack,
  playTrackByIndex,
  togglePlayPause,
  nextTrack,
  prevTrack,
  addTrack,
  removeTrack,
  setVolume,
  stop,
  toggleLoop
} = playerSlice.actions;
