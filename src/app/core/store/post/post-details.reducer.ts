import { createReducer, on } from '@ngrx/store';

import { IPost } from '../../interfaces/post.interface';
import * as PostActions from './post.actions';

export interface PostDetailsState {
    post: IPost | null;
    error: string | null;
    loading: boolean;
}

const initialState: PostDetailsState = {
    post: null,
    error: null,
    loading: false
};

export const postDetailsReducer = createReducer(
    initialState,
    on(PostActions.fetchPostDetails, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(PostActions.fetchPostDetailsSuccess, (state, action) => {
        const post: IPost = {
            ...action.post
        };
        return {
            ...state,
            post: post,
            loading: false
        }
    }),
    on(PostActions.fetchPostDetailsError, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }),
);