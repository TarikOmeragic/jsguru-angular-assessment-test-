import { createReducer, on } from '@ngrx/store';

import { IPost } from '../../interfaces/post.interface';
import * as PostActions from './post.actions';

export interface PostState {
    posts: Array<IPost>;
    error: string | null;
    loading: boolean;
}

const initialState: PostState = {
    posts: [],
    error: null,
    loading: false
};

export const postReducer = createReducer(
    initialState,
    on(PostActions.fetchPosts, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(PostActions.fetchPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: [...action.posts],
            loading: false
        }
    }),
    on(PostActions.fetchPostsError, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    })
);