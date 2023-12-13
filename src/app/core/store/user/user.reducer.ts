import { createReducer, on } from '@ngrx/store';

import * as UserActions from './user.actions';
import { IUser } from '../../interfaces/user.interface';

export interface UserState {
    users: Array<IUser>;
    error: string | null;
    loading: boolean;
}

const initialState: UserState = {
    users: [],
    error: null,
    loading: false
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.fetchUsers, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(UserActions.fetchUsersSuccess, (state, action) => {
        return {
            ...state,
            users: [...action.users],
            loading: false
        }
    }),
    on(UserActions.fetchUsersError, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }),
);