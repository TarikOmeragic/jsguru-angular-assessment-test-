import { createAction, props } from "@ngrx/store";

import { IUser } from "../../interfaces/user.interface";
import { IPost } from "../../interfaces/post.interface";

export const FETCH_POSTS = '[Posts] Fetch posts';
export const FETCH_POSTS_SUCCESS = '[Posts] Fetch posts success';
export const FETCH_POSTS_ERROR = '[Posts] Fetch posts error';

export const FETCH_POST_DETAILS = '[Posts] Fetch post details';
export const FETCH_POST_DETAILS_SUCCESS = '[Posts] Fetch post details success';
export const FETCH_POST_DETAILS_ERROR = '[Posts] Fetch post details error';

export const fetchPosts = createAction(
    FETCH_POSTS,
    props<{ searchUsers: Array<IUser> }>()
);

export const fetchPostsSuccess = createAction(
    FETCH_POSTS_SUCCESS,
    props<{ posts: Array<IPost> }>()
);

export const fetchPostsError = createAction(
    FETCH_POSTS_ERROR,
    props<{ error: string }>()
);

export const fetchPostDetails = createAction(
    FETCH_POST_DETAILS,
    props<{ id: number }>()
);

export const fetchPostDetailsSuccess = createAction(
    FETCH_POST_DETAILS_SUCCESS,
    props<{ post: IPost }>()
);

export const fetchPostDetailsError = createAction(
    FETCH_POST_DETAILS_ERROR,
    props<{ error: string }>()
);
