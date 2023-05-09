import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  search(searchTerm: string): Observable<any> {
    return this.http.get('/search/images/' + searchTerm);
  }

  randomTopic(): string {
    const topics = ['landscape', 'portrait', 'nature', 'cityscape', 'food', 'travel', 'animals', 'architecture', 'abstract', 'sports', 'fashion', 'music', 'technology', 'art', 'culture', 'people', 'business', 'health', 'education', 'science'];
    return topics[Math.floor(Math.random() * topics.length)];
  }

  randomThumbnailImage(size = {width: 400, height: 300}): string {
    return `https://source.unsplash.com/random/${size.width}x${size.height}/?` + this.randomTopic();
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}
