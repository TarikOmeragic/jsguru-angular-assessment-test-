import { PhotoState } from './photo/photo.reducer';
import { PostDetailsState } from './post/post-details.reducer';
import { PostState } from './post/post.reducer';
import { UserState } from './user/user.reducer';

export interface AppState {
    photos: PhotoState;
    posts: PostState;
    post: PostDetailsState;
    users: UserState;
}