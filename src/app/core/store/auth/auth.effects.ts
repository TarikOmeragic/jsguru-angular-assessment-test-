import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';

const handleAuth = (email: string, password: string) => {
    const user = {
        email,
        password
    };
    localStorage.setItem('userData', JSON.stringify(user));
    return AuthActions.authSuccessAction({ credentials: {
        email,
        password
    } });
};

const handleError = (error: any) => {
    return of(AuthActions.authFailAction({ value: 'Error occurred' }))
};

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {}

    signupStartEffect = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.signupStartAction),
    ));

    loginStartEffect = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginStartAction),
        switchMap((authData) => {
            return this.authService.login(authData.credentials)
                .pipe(
                    map((response) => {
                        return handleAuth(
                            response.email,
                            response.password
                        );
                    }),
                    catchError(error => {
                        return handleError(error);
                    })
                )
        })
    ));
}