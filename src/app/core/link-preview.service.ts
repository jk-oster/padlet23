import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LinkPreviewService {

  previewCache: Map<string, any> = new Map<string, any>();
  constructor(protected http: HttpClient) { }

  public async getLinkPreview(url: string): Promise<any> {
    if(!url) {
      return null;
    }
    if(this.previewCache.has(url)) {
      return this.previewCache.get(url);
    }
    const urlBase64encoded = btoa(url);
    const response = await lastValueFrom(this.http.get<any>('/metadata/' + urlBase64encoded));
    this.previewCache.set(url, response);
    console.log('response', response);
    console.log('this.previewCache', this.previewCache);
    return response;
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
