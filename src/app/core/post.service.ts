import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post";
import {Observable} from "rxjs";

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

  createPost(padletId: number, content: string, cover: string): Observable<Post> {
    return this.http.post<Post>('/post', {content, cover, 'padlet_id': padletId});
  }

  updatePost(id: number, content: string, cover: string): Observable<Post> {
    return this.http.post<Post>(`/post/${id}`, {content, cover});
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`/post/${id}`);
  }
}
