import { explorerSaga } from "./explorerSaga";

export function* rootSaga() {
  yield explorerSaga();
}