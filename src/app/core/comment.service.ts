import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`/post/${postId}/comment`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getComment(postId: number, commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`/post/${postId}/comment/${commentId}`);
  }

  createComment(postId: number, content: string): Observable<Comment> {
    return this.http.post<Comment>('/comment', { text: content, 'post_id': postId })
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateComment(commentId: number, content: string): Observable<Comment> {
    return this.http.post<Comment>(`/comment/${commentId}`, { text: content });
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`/comment/${commentId}`);
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
