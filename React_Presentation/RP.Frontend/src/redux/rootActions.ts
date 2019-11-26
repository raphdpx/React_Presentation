import { ActionType } from "typesafe-actions";

import * as shellAction from "./shell/shell.actions";

export const allActions = {
  shell: shellAction
};

export default allActions;

export type RootAction = ActionType<typeof allActions>;
