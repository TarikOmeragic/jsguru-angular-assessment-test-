import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { ImagesService } from '../../../images/services/images.service';
import { LocalStorageService } from '../../services/local-storage.service';
import * as PhotoActions from './photo.actions';

@Injectable()
export class PhotoEffects {

    constructor(
      private actions$: Actions,
      private imagesService: ImagesService,
      private localStorageService: LocalStorageService,
    ) {}

    fetchPhotos = createEffect(() => this.actions$.pipe(
        ofType(PhotoActions.fetchPhotos),
        switchMap((photoAction) => {
            return this.imagesService.getPhotos(photoAction.value.page, photoAction.value.limit).pipe(
                tap(_ => {
                    this.localStorageService.setItem('photosLimit', photoAction.value.limit + ''); 
                }),
                map((photos) => {                
                    return PhotoActions.fetchPhotosSuccess({ photos });
                }),
                catchError((error) => of(
                    PhotoActions.fetchPhotosError({ error })
                ))
            )
        })
    ));
}
