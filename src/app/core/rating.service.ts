import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.post<Rating>('/rating', { 'post_id': postId, 'rating': value });
  }

  updateRating(postId: number, value: number): Observable<Rating> {
    return this.http.put<Rating>(`/rating/${postId}`, { 'rating': value });
  }

  deleteRating(postId: number): Observable<any> {
    return this.http.delete(`/rating/${postId}`);
  }
}
