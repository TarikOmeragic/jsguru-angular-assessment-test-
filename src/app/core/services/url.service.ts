import { Injectable } from '@angular/core';

import { Url } from '../models/url.class';

@Injectable()
export class UrlService {
  constructor() {}

  public get authUrl(): Url {
    const url = new Url();
    url.push('app');
    return url;
  }

  public get baseUrl(): Url {
    const url = new Url();
    url.push('api');
    return url;
  }
}
