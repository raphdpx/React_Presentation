import { all, fork } from "redux-saga/effects";
import shellSagas from "./shell/shell.sagas";

const rootSaga = function*() {
  yield all([fork(shellSagas)]);
};

export default rootSaga;
