import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestService {

  private httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      responseType: 'json',
    },
  };

  constructor(private http: HttpClient) {}

  get<R>(url: string): Observable<R> {
    return this.http.get<R>(url, this.httpOptions);
  }

  post<T>(url: string, body: unknown | null): Observable<T> {
    return this.http.post<T>(url, body || null, this.httpOptions);
  }

  put<T>(url: string, body: unknown): Observable<T> {
    return this.http.put<T>(url, body, this.httpOptions);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, this.httpOptions);
  }
}
