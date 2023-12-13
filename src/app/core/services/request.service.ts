import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestService {

  constructor(private http: HttpClient) {}

  get<R>(url: string): Observable<R> {
    return this.http.get<R>(url);
  }

  post<T>(url: string, body: unknown | null): Observable<T> {
    return this.http.post<T>(url, body || null);
  }

  put<T>(url: string, body: unknown): Observable<T> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
