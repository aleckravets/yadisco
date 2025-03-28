import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  playlist: PlaylistItem[];
}

interface PlaylistItem {
  url: string;
}

const initialState: AppState = {
  playlist: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToPlaylist: (state, action: PayloadAction<PlaylistItem>) => {
      state.playlist.push(action.payload);
    },
  },
});
