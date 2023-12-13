import { createReducer, on } from '@ngrx/store';

import { IPhoto } from '../../interfaces/image.interface';
import * as PhotoActions from './photo.actions';

export interface PhotoState {
    photos: Array<IPhoto>;
    error: string | null;
    loading: boolean;
}

const initialState: PhotoState = {
    photos: [],
    error: null,
    loading: false
};

export const photoReducer = createReducer(
    initialState,
    on(PhotoActions.fetchPhotos, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(PhotoActions.fetchPhotosSuccess, (state, action) => {
        return {
            ...state,
            photos: [...action.photos],
            loading: false
        }
    }),
    on(PhotoActions.fetchPhotosError, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    })
);