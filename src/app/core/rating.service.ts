import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getRatings(postId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`/post/${postId}/rating`);
  }

  createRating(postId: number, value: number): Observable<Rating> {
    return this.http.post<Rating>('/rating', { 'post_id': postId, 'rating': value })
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateRating(ratingId: number, value: number): Observable<Rating> {
    return this.http.put<Rating>(`/rating/${ratingId}`, { 'rating': value })
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteRating(ratingId: number): Observable<any> {
    return this.http.delete(`/rating/${ratingId}`);
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
