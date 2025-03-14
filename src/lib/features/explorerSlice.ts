import { ResourceType } from "@/server/yandexDisk/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

interface ExplorerState {
  path: string | null;
  files: ExplorerFile[] | null;
  loading: boolean;
  error: boolean;
  errorStatus: number | null;
}

export interface ExplorerFile {
  name: string;
  path: string;
  type: ResourceType;
}

const initialState: ExplorerState = {
  path: null,
  files: null,
  loading: false,
  error: false,
  errorStatus: null
};

export const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
    fetchFilesRequest: (state) => {
      state.loading = true;
      state.error = false;
      state.errorStatus = null;
    },
    fetchFilesSuccess(state, action: PayloadAction<ExplorerFile[]>) {
      state.loading = false;
      state.files = action.payload;
    },
    fetchFilesFailure(state, action: PayloadAction<number | null>) {
      state.loading = false;
      state.error = true;
      state.errorStatus = action.payload;
    },
  },
});

export const {
  setPath,
  fetchFilesRequest,
  fetchFilesSuccess,
  fetchFilesFailure,
} = explorerSlice.actions;
