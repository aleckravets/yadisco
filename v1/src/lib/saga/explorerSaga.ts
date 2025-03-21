import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  fetchFilesFailure,
  fetchFilesRequest,
  fetchFilesSuccess,
  setPath,
} from "../features/explorerSlice";
import { RootState } from "../store";
import { getDirectoryFiles } from "@/client/api/files";
import { FileListResponse } from "@/server/api/files/types";
import { isAxiosError } from "axios";

function* fetchFiles() {
  try {
    const path: string = yield select(
      (state: RootState) => state.explorer.path
    );

    yield put(fetchFilesRequest());

    const fileListResponse: FileListResponse = yield call(getDirectoryFiles, path);

    yield put(
      fetchFilesSuccess(
        fileListResponse.items.map((resource) => ({
          name: resource.name,
          path: resource.path,
          type: resource.type,
        }))
      )
    );
  } catch(error) {
    const status = isAxiosError(error) ? error.status : 500;
    yield put(fetchFilesFailure(status || null));
  }
}

export function* explorerSaga() {
  yield takeLatest(setPath.type, fetchFiles);
}
