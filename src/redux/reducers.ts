import { combineReducers } from "redux";

import todo from "./slices/todo";

const rootReducer = combineReducers({ todo });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
