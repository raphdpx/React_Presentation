import { RootAction } from "../rootActions";
import { getType } from "typesafe-actions";
import { showConfirmationDialog, hideConfirmationDialog } from "./shell.actions";
import { combineReducers } from "redux";

// Confirm Dialog Slice
export type ConfirmDialogData = {
  title?: string;
  message: string;
  onConfirmed?: () => void;
};

export type ShellConfirmDialogState = Readonly<{
  data: ConfirmDialogData;
  isShown: boolean;
}>;

const initialConfirmDialogState: ShellConfirmDialogState = {
  data: { message: "", title: undefined },
  isShown: false
};

export const shellConfirmDialogReducer = (
  state = initialConfirmDialogState,
  action: RootAction
): ShellConfirmDialogState => {
  switch (action.type) {
    case getType(showConfirmationDialog): {
      return {
        data: (action as any).payload,
        isShown: true
      };
    }
    case getType(hideConfirmationDialog): {
      return initialConfirmDialogState;
    }
    default:
      return state;
  }
};

export const shellReducer = combineReducers({
  confirmDialog: shellConfirmDialogReducer
});
