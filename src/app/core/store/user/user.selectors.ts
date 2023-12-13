import { AppState } from "../app.state";

export const selectUsers = (state: AppState) => state.users;

export const selectUser = (state: AppState) => state.user;