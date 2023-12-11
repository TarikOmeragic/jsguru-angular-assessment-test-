import { AuthState } from './auth.reducer';

export const selectUser = (state: { auth: AuthState }) => state.auth;
