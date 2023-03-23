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

  createPadlet(name: string, description: string, cover: string): Observable<Padlet>  {
    return this.http.post<Padlet>('/padlet', {name, description, cover});
  }

  updatePadlet(id: number, name: string, description: string, cover: string): Observable<Padlet>  {
    return this.http.put<Padlet>(`/padlet/${id}`, {name: name, description: description, cover: cover});
  }

  deletePadlet(id: string): Observable<any> {
    return this.http.delete<any>(`/padlet/${id}`);
  }
}
