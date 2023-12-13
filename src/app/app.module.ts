import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { PhotoEffects } from './core/store/photo/photo.effects';
import { photoReducer } from './core/store/photo/photo.reducer';
import { postDetailsReducer } from './core/store/post/post-details.reducer';
import { PostEffects } from './core/store/post/post.effects';
import { postReducer } from './core/store/post/post.reducer';
import { UserEffects } from './core/store/user/user.effects';
import { userReducer } from './core/store/user/user.reducer';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    StoreModule.forRoot({
      posts: postReducer,
      post: postDetailsReducer,
      photos: photoReducer,
      users: userReducer,
    }),
    EffectsModule.forRoot([PostEffects, PhotoEffects, UserEffects]),
    MatSnackBarModule
  ],
  providers: [
    ErrorInterceptor,
    LoaderInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
