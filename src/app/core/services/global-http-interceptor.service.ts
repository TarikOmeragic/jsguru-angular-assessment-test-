import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(
    public router: Router,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.error instanceof ErrorEvent) {
          console.error('Error Event');
        } else {
          switch (error.status) {
            case 400: /** bad request */
              this.router.navigateByUrl('/forbidden');
              break;
            case 401: /** unauthorized */
              this.router.navigateByUrl('/forbidden');
              break;
            case 403: /** forbidden */
              this.router.navigateByUrl('/forbidden');
              break;
            case 404: /** not-found */
              this.router.navigateByUrl('/not-found');
              break;
          }
        }
        return throwError(() => error.error);
      })
    );
  }
}
