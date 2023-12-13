import { createAction, props } from "@ngrx/store";

import { IPhoto } from "../../interfaces/image.interface";

export const FETCH_PHOTOS = '[Photos] Fetch photos';
export const FETCH_PHOTOS_SUCCESS = '[Photos] Fetch photos success';
export const FETCH_PHOTOS_ERROR = '[Photos] Fetch photos error';

export const fetchPhotos = createAction(
    FETCH_PHOTOS,
    props<{ value: {page: number, limit: number} }>()
);

export const fetchPhotosSuccess = createAction(
    FETCH_PHOTOS_SUCCESS,
    props<{ photos: Array<IPhoto> }>()
);

export const fetchPhotosError = createAction(
    FETCH_PHOTOS_ERROR,
    props<{ error: string }>()
);
