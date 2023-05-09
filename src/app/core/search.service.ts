import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchTerm: string = '';

  get search(): string {
    return this.searchTerm;
  }
  constructor() { }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
