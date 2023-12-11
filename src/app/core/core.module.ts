import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AbstractService } from './services/abstract.service';
import { GlobalHttpInterceptorService } from './services/global-http-interceptor.service';
import { LocalStorageService } from './services/local-storage.service';
import { RequestService } from './services/request.service';
import { UrlService } from './services/url.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AbstractService,
    GlobalHttpInterceptorService,
    LocalStorageService,
    RequestService,
    UrlService
  ]
})
export class CoreModule { }
