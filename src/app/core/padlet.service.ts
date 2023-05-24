import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Padlet} from "../models/padlet";
import {catchError, debounceTime, distinctUntilChanged, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PadletService {

  constructor(private http: HttpClient) {
  }

  getPadlets(): Observable<Padlet[]> {
    return this.http.get<Padlet[]>('/padlet')
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getPadlet(id: number): Observable<Padlet> {
    return this.http.get<Padlet>(`/padlet/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createPadlet(data: Object): Observable<Padlet>  {
    return this.http.post<Padlet>('/padlet', data)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updatePadlet(id: number, data: Object): Observable<Padlet>  {
    return this.http.put<Padlet>(`/padlet/${id}`, data)
      // .pipe(debounceTime(500))
      // .pipe(distinctUntilChanged())
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deletePadlet(id: number): Observable<any> {
    return this.http.delete<any>(`/padlet/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  togglePadletPublic(padlet: Padlet): Observable<Padlet> {
    return this.http.put<Padlet>(`/padlet/${padlet.id}/toggle`, {})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  sharePadlet(padlet: Padlet, mappedUserPermissions: Object): Observable<any> {
    return this.http.post(`/padlet/${padlet.id}/share`, mappedUserPermissions)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
