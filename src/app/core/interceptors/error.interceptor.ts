import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService } from '../services/logger.service';
  
  @Injectable({ providedIn: 'root' })
  export class ErrorInterceptor implements HttpInterceptor {

    private snackBarDuration: number = 5000;

    constructor(
      public router: Router,
      private loggerService: LoggerService,
      private snackBar: MatSnackBar
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
                this.snackBar.open('400: Bad request', '', {duration: this.snackBarDuration});
                break;
              case 401: /** unauthorized */
                this.router.navigateByUrl('');
                this.snackBar.open('401: Unauthorized', '', {duration: this.snackBarDuration});
                break;
              case 403: /** forbidden */
                this.router.navigateByUrl('');
                this.snackBar.open('403: Forbidden page', '', {duration: this.snackBarDuration});
                break;
              case 404: /** not-found */
                this.router.navigateByUrl('');
                this.snackBar.open('404: Not found', '', {duration: this.snackBarDuration});
                break;
              default:
                this.router.navigateByUrl('');
                this.snackBar.open('Error', '', {duration: this.snackBarDuration});
                break;
            }
          }
          this.loggerService.error(`Error ${error.status}: ${error.message}`)
          return throwError(`Error ${error.status}: ${error.message}`);
        })
      );
    }
  }
  