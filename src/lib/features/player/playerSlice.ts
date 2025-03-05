import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Track {
  id: number;
  fileId: string;
  title: string;
  url: string;
}

interface PlayerState {
  playlist: Track[];
  currentTrack: Track | null;
  currentTrackIndex: number | null;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  playlist: [],
  currentTrack: null,
  currentTrackIndex: null,
  isPlaying: false,
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
      state.isPlaying = true;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    nextTrack: (state) => {
      if (state.currentTrackIndex !== null && state.playlist.length > 0) {
        state.currentTrackIndex =
          (state.currentTrackIndex + 1) % state.playlist.length;
        state.currentTrack = state.playlist[state.currentTrackIndex];
        state.isPlaying = true;
      }
    },
    prevTrack: (state) => {
      if (state.currentTrackIndex !== null && state.playlist.length > 0) {
        state.currentTrackIndex =
          (state.currentTrackIndex - 1 + state.playlist.length) %
          state.playlist.length;
        state.currentTrack = state.playlist[state.currentTrackIndex];
        state.isPlaying = true;
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
      state.isPlaying = true;
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
} = playerSlice.actions;
