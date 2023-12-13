import { createAction, props } from "@ngrx/store";

import { IUser } from "../../interfaces/user.interface";

export const FETCH_USERS = '[Users] Fetch users';
export const FETCH_USERS_SUCCESS = '[Users] Fetch users success';
export const FETCH_USERS_ERROR = '[Users] Fetch users error';

export const FETCH_USER_BY_ID = '[Users] Fetch user by id';
export const FETCH_USER_BY_ID_SUCCESS = '[Users] Fetch user by id success';
export const FETCH_USER_BY_ID_ERROR = '[Users] Fetch user by id error';

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
