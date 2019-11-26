import { RootState } from "../rootReducer";
import { createSelector } from "reselect";

const selectShellState = (state: RootState) => state.shell;

export const selectConfirmDialogState = createSelector(selectShellState, state => state.confirmDialog);
