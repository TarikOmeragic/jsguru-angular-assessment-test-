import { Injectable } from '@angular/core';

import { ApiPathsEnum } from 'src/app/core/enums/api-paths.enums';
import { RequestService } from 'src/app/core/services/request.service';
import { environment } from 'src/environments/environment';
import { IPhoto } from '../interfaces/image.interface';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private url: string = environment.apiUrl;

  constructor(
    private requestService: RequestService
  ) {}

  getPhotos(
    page: number,
    limit: number
  ) {
    let url = `${this.url}${ApiPathsEnum.PHOTOS}?_page=${page}&_limit=${limit}`;
    return this.requestService.get<Array<IPhoto>>(url);
  }
}
