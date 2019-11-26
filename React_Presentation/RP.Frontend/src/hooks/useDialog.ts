import { ConfirmDialogData } from "../redux/shell/shell.reducer";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { allActions } from "../redux";

export const useDialog = () => {
  const dispatch = useDispatch();

  const showConfirmDialog = useCallback(
    (data: ConfirmDialogData) => {
      dispatch(allActions.shell.showConfirmationDialog(data));
    },
    [dispatch]
  );

  return {
    showConfirmDialog
  };
};
