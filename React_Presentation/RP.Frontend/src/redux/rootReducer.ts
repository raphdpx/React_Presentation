import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { shellReducer } from "./shell/shell.reducer";

const rootReducer = () =>
  combineReducers({
    shell: shellReducer
  });
export default rootReducer;

export type RootState = StateType<ReturnType<typeof rootReducer>>;
