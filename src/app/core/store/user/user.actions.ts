import { createAction, props } from "@ngrx/store";

import { IUser } from "../../interfaces/user.interface";

export const FETCH_USERS = '[Users] Fetch users';
export const FETCH_USERS_SUCCESS = '[Users] Fetch users success';
export const FETCH_USERS_ERROR = '[Users] Fetch users error';

export const fetchUsers = createAction(
    FETCH_USERS,
);

export const fetchUsersSuccess = createAction(
    FETCH_USERS_SUCCESS,
    props<{ users: Array<IUser> }>()
);

export const fetchUsersError = createAction(
    FETCH_USERS_ERROR,
    props<{ error: string }>()
);
