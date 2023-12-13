import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  
  constructor() {}

  getStorage(): Storage {
    return localStorage;
  }

  getItem(key: string): string | null {
    return localStorage.getItem(`jsguru.${key}`);
  }

  setItem(key: string, item: string): void {
    localStorage.setItem(`jsguru.${key}`, item);
  }

  removeItem(key: string): void {
    localStorage.removeItem(`jsguru.${key}`);
  }

  clear(): void {
    localStorage.clear();
  }
}
