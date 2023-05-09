import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
