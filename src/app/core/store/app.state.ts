import { PhotoState } from './photo/photo.reducer';
import { PostDetailsState } from './post/post-details.reducer';
import { PostState } from './post/post.reducer';
import { UserDetailsState } from './user/user-details.reducer';
import { UserState } from './user/user.reducer';

export interface AppState {
    users: UserState;
    user: UserDetailsState,
    posts: PostState;
    post: PostDetailsState,
    photos: PhotoState
}