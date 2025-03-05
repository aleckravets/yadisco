import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Track {
  id: string;
  title: string;
  url: string;
}

interface PlayerState {
  playlist: Track[];
  currentTrackIndex: number | null;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  playlist: [],
  currentTrackIndex: null,
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.playlist = action.payload;
      state.currentTrackIndex = action.payload.length > 0 ? 0 : null;
    },
    playTrack: (state, action: PayloadAction<number>) => {
      state.currentTrackIndex = action.payload;
      state.isPlaying = true;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    nextTrack: (state) => {
      if (state.currentTrackIndex !== null && state.playlist.length > 0) {
        state.currentTrackIndex =
          (state.currentTrackIndex + 1) % state.playlist.length;
        state.isPlaying = true;
      }
    },
    prevTrack: (state) => {
      if (state.currentTrackIndex !== null && state.playlist.length > 0) {
        state.currentTrackIndex =
          (state.currentTrackIndex - 1 + state.playlist.length) %
          state.playlist.length;
        state.isPlaying = true;
      }
    },
    addTrack: (state, action: PayloadAction<Track>) => {
      state.playlist.push(action.payload);
    },
    removeTrack: (state, action: PayloadAction<string>) => {
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
  },
});

export const {
  setPlaylist,
  playTrack,
  togglePlayPause,
  nextTrack,
  prevTrack,
  addTrack,
  removeTrack,
} = playerSlice.actions;
