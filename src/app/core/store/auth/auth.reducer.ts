import { createReducer, on } from "@ngrx/store";

import { IUser } from "../../interfaces/user.interface";
import * as AuthActions from './auth.actions';

export interface AuthState {
    user: IUser | null;
    error: string | null;
    loading: boolean
}

const initialState: AuthState = {
    user: null,
    error: null,
    loading: false
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.signupStartAction, (state) => {
        return {
            ...state,
            error: null,
            loading: true
        }
    }),
    on(AuthActions.loginStartAction, (state) => {
        return {
            ...state,
            error: null,
            loading: true
        }
    }),
    on(AuthActions.authSuccessAction, (state, action) => {
        const user = {
            email: action.credentials.email,
            password: action.credentials.password
        };
        return {
            ...state,
            user,
            error: null,
            loading: false
        }
    }),
    on(AuthActions.authFailAction, (state, action) => {
        return {
            ...state,
            user: null,
            error: action.value,
            loading: false
        }
    }),
    on(AuthActions.authLogoutAction, (state, action) => {
        return {
            ...state,
            user: null,
            error: null,
            loading: false
        }
    }),
    on(AuthActions.clearErrorAction, (state, action) => {
        return {
            ...state,
            error: null
        }
    })
);