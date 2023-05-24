import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getPosts(padletId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`/padlet/${padletId}/post`);
  }

  getPost(padletId: number, id: number): Observable<Post> {
    return this.http.get<Post>(`/padlet/${padletId}/post/${id}`);
  }

  createPost(padletId: number, data: any): Observable<Post> {
    if(!data.padlet_id) {
      data.padlet_id = padletId;
    }
    return this.http.post<Post>('/post', data)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updatePost(id: number, data: any): Observable<Post> {
    return this.http.put<Post>(`/post/${id}`, data)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`/post/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
