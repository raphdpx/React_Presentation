import { createAction } from "typesafe-actions";
import { ConfirmDialogData } from "./shell.reducer";

export const showConfirmationDialog = createAction("@shell/SHOW_CONFIRM_DIALOG")<ConfirmDialogData>();

export const confirmYes = createAction("@shell/CONFIRM_YES")();
export const confirmNo = createAction("@shell/CONFIRM_NO")();

export const hideConfirmationDialog = createAction("@shell/HIDE_CONFIRM_DIALOG")();
