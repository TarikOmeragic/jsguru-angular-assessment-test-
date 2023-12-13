import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

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
        switchMap((_) => {
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

    fetchUserDertails = createEffect(() => this.actions$.pipe(
        ofType(UserActions.fetchUserById),
        switchMap((userAction) => {
            return this.postsService.getUserById(userAction.id).pipe(
                map((user) => {                    
                    return UserActions.fetchUserByIdSuccess({ user });
                }),
                catchError((error) => of(
                    UserActions.fetchUserByIdError({ error })
                ))
            )
        })
    ));
}