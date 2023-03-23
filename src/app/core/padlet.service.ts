import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Padlet} from "../models/padlet";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PadletService {

  constructor(private http: HttpClient) {
  }

  getPadlets(): Observable<Padlet[]> {
    return this.http.get<Padlet[]>('/padlet');
  }

  getPadlet(id: number): Observable<Padlet> {
    return this.http.get<Padlet>(`/padlet/${id}`);
  }

  createPadlet(data: Object): Observable<Padlet>  {
    return this.http.post<Padlet>('/padlet', data);
  }

  updatePadlet(id: number, data: Object): Observable<Padlet>  {
    return this.http.put<Padlet>(`/padlet/${id}`, data);
  }

  deletePadlet(id: number): Observable<any> {
    return this.http.delete<any>(`/padlet/${id}`);
  }

  togglePadletPublic(padlet: Padlet): Observable<Padlet> {
    return this.http.put<Padlet>(`/padlet/${padlet.id}`, {public: !padlet.public});
  }

  sharePadlet(padlet: Padlet){
    const user = [
      {
        "user_id": 4,
        "permission_level": 1
      },
      {
        "user_id": 5,
        "permission_level": 2
      },
      {
        "user_id": 6,
        "permission_level": 3
      }
    ];
    return this.http.post(`/padlet/${padlet.id}/share`, user);
  }
}
