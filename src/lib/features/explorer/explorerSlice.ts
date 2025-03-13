import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExplorerState {
  path: string;
  files?: FileItem[];
}

interface FileItem {
  id: string;
  name: string;
  path: string;
}

const initialState: ExplorerState = {
  path: "/",
};

export const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    cd: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
  },
});

export const { cd } = explorerSlice.actions;
