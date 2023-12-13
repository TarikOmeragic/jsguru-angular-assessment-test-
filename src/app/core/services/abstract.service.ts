import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { CallbackFunction } from '../interfaces/callback-function.interface';
import { RequestService } from './request.service';
import { UrlService } from './url.service';

@Injectable({ providedIn: 'root' })
export class AbstractService {

  protected requestService: RequestService;
  protected urlService: UrlService;

  constructor(injector: Injector) {
    this.urlService = injector.get(UrlService);
    this.requestService = injector.get(RequestService);
  }

  protected _subscribe<T>(
    observable: Observable<any>,
    clb: CallbackFunction<T>,
    errorClb?: CallbackFunction<any>,
    completeClb?: () => void
  ) {
    return observable.subscribe(
      (e) => {
        clb(e);
      },
      (e) => {
        if (errorClb) {
          errorClb(e);
        }
      },
      () => {
        if (completeClb) {
          completeClb();
        }
      }
    );
  }
}
