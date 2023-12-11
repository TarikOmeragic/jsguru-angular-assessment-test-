import { createAction, props } from "@ngrx/store";

export const SIGNUP_START = '[Auth] Signup start';
export const LOGIN_START = '[Auth] Login start';
export const AUTH_SUCCESS = '[Auth] Auth success';
export const AUTH_FAIL = '[Auth] Auth fail';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear error';

export const signupStartAction = createAction(
    SIGNUP_START,
    props<{ credentials: { email: string; password: string } }>()
);

export const loginStartAction = createAction(
    LOGIN_START,
    props<{ credentials: { email: string; password: string } }>()
);

export const authSuccessAction = createAction(
    AUTH_SUCCESS,
    props<{ credentials: { email: string; password: string }  }>()
);

export const authFailAction = createAction(
    AUTH_FAIL,
    props<{ value: string }>()
);

export const authLogoutAction = createAction(
    LOGOUT
);

export const clearErrorAction = createAction(
    CLEAR_ERROR
);
