import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { PostsService } from '../../../posts/services/posts.service';
import * as PostActions from './post.actions';

@Injectable()
export class PostEffects {

    constructor(
        private actions$: Actions,
        private postsService: PostsService
    ) {}

    fetchPosts = createEffect(() => this.actions$.pipe(
        ofType(PostActions.fetchPosts),
        exhaustMap((postAction) => {
            return this.postsService.getPosts(postAction.searchUsers).pipe(
                map((posts) => {                    
                    return PostActions.fetchPostsSuccess({ posts });
                }),
                catchError((error) => of(
                    PostActions.fetchPostsError({ error })
                ))
            )
        })
    ));

    fetchPostDertails = createEffect(() => this.actions$.pipe(
        ofType(PostActions.fetchPostDetails),
        switchMap((postAction) => {
            return this.postsService.getPostById(postAction.id).pipe(
                map((post) => {                    
                    return PostActions.fetchPostDetailsSuccess({ post });
                }),
                catchError((error) => of(
                    PostActions.fetchPostDetailsError({ error })
                ))
            )
        })
    ));
}