import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() {}

  log(message: any): void {
    if (isDevMode()) {
      console.log(message);
    }
  }

  error(message: any): void {
    if (isDevMode()) {
      console.error(message);
    }
  }
}
