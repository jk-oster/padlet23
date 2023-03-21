import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`/post/${postId}/comment`);
  }

  getComment(postId: number, commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`/post/${postId}/comment/${commentId}`);
  }

  createComment(postId: number, content: string): Observable<Comment> {
    return this.http.post<Comment>('/comment', { content, 'post_id': postId });
  }

  updateComment(commentId: number, content: string): Observable<Comment> {
    return this.http.post<Comment>(`/comment/${commentId}`, { content });
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`/comment/${commentId}`);
  }
}
