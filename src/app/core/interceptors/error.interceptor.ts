import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';
  
  @Injectable({ providedIn: 'root' })
  export class ErrorInterceptor implements HttpInterceptor {

    constructor(
      public router: Router,
      private loggerService: LoggerService
    ) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
            this.loggerService.error('Error Event');
          } else {
            switch (error.status) {
              case 400: /** bad request */
                this.router.navigateByUrl('');
                break;
              case 401: /** unauthorized */
                this.router.navigateByUrl('');
                break;
              case 403: /** forbidden */
                this.router.navigateByUrl('');
                break;
              case 404: /** not-found */
                this.router.navigateByUrl('');
                break;
            }
          }
          this.loggerService.error(`Error ${error.status}: ${error.message}`)
          return throwError(`Error ${error.status}: ${error.message}`);
        })
      );
    }
  }
  