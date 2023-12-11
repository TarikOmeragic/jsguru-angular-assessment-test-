import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {}

  getStorage(): Storage {
    return localStorage;
  }

  getItem(key: string): string | null {
    return localStorage.getItem(`app.${key}`);
  }

  setItem(key: string, item: string): void {
    localStorage.setItem(`app.${key}`, item);
  }

  removeItem(key: string): void {
    localStorage.removeItem(`app.${key}`);
  }

  getStoragePath(): string {
    return 'app';
  }

  clear(): void {
    localStorage.clear();
  }
}
