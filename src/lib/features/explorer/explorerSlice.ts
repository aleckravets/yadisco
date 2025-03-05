import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export type ExplorerView = "list" | "tree";

export interface ExplorerSliceState {
  view: ExplorerView;
}

const initialState: ExplorerSliceState = {
  view: "list",
};

export const explorerSlice = createAppSlice({
  name: "explorer",
  initialState,
  reducers: (create) => ({
    setView: create.reducer((state, action: PayloadAction<ExplorerView>) => {
      state.view = action.payload;
    }),
  }),
  selectors: {
    selectView: (explorer) => explorer.view
  },
});

export const { setView } = explorerSlice.actions;

export const { selectView } = explorerSlice.selectors;
