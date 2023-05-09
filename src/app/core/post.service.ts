import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post";
import {Observable, throwError} from "rxjs";

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
    return this.http.post<Post>('/post', data);
  }

  updatePost(id: number, data: any): Observable<Post> {
    return this.http.put<Post>(`/post/${id}`, data);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`/post/${id}`);
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
