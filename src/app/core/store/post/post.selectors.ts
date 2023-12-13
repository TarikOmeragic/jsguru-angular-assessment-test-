import { AppState } from "../app.state";

export const selectPosts = (state: AppState) => state.posts;

export const selectPost = (state: AppState) => state.post;
