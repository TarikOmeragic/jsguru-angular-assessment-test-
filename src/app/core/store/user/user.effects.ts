import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { PostsService } from '../../../posts/services/posts.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private postsService: PostsService
    ) {}

    fetchUsers = createEffect(() => this.actions$.pipe(
        ofType(UserActions.fetchUsers),
        exhaustMap(() => {
            return this.postsService.getUsers().pipe(
                map((users) => {                    
                    return UserActions.fetchUsersSuccess({ users });
                }),
                catchError((error) => of(
                    UserActions.fetchUsersError({ error })
                ))
            )
        })
    ));
}