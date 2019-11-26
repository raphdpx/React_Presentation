import { take, put, race, fork, all } from "redux-saga/effects";

import * as ShellActions from "./shell.actions";
import { ConfirmDialogData } from "./shell.reducer";
import { getType } from "typesafe-actions";

export function* confirmSaga(dialogData: ConfirmDialogData) {
  // Cause the dialog to be shown (reducer will put the message
  // in the store; the main shell UI component will receive the
  // message in its props and then display the dialog)
  yield put(ShellActions.showConfirmationDialog(dialogData));
  // Wait for either a yes or a no.
  // The dialog UI component receives yes and no event handlers
  // in its props that dispatch these actions.
  const { yes } = yield race({
    yes: take(getType(ShellActions.confirmYes)),
    no: take(getType(ShellActions.confirmNo))
  });
  // Tell a reducer to hide the dialog

  // Returns true if the 'yes' action was received
  return !!yes;
}

export function* watchConfirmSaga() {
  while (true) {
    yield race({
      yes: take(getType(ShellActions.confirmYes)),
      no: take(getType(ShellActions.confirmNo))
    });
    yield put(ShellActions.hideConfirmationDialog());
  }
}

export default function* shellSagas() {
  yield all([fork(watchConfirmSaga)]);
}
