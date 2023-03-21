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

  getRating(postId: number, userId: number): Observable<Rating> {
    return this.http.get<Rating>(`/post/${postId}/rating/${userId}`);
  }

  createRating(postId: number, userId: number, value: number): Observable<Rating> {
    return this.http.post<Rating>('/rating', { 'post_id': postId, 'value': value });
  }

  updateRating(postId: number, userId: number, value: number): Observable<Rating> {
    return this.http.put<Rating>(`/post/${postId}/rating/${userId}`, { 'value': value });
  }

  deleteRating(postId: number, userId: number): Observable<any> {
    return this.http.delete(`/post/${postId}/rating/${userId}`);
  }
}
