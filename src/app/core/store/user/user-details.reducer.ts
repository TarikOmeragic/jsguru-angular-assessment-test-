import { createReducer, on } from '@ngrx/store';

import { IUser } from '../../interfaces/user.interface';
import * as UserActions from './user.actions';

export interface UserDetailsState {
    user: IUser | null;
    error: string | null;
    loading: boolean;
}

const initialState: UserDetailsState = {
    user: null,
    error: null,
    loading: false
};

export const userDetailsReducer = createReducer(
    initialState,
    on(UserActions.fetchUserById, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(UserActions.fetchUserByIdSuccess, (state, action) => {
        const user: IUser = {
            ...action.user
        };
        return {
            ...state,
            user: user,
            loading: false
        }
    }),
    on(UserActions.fetchUserByIdError, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }),
);