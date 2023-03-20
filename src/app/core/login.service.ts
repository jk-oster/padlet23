import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginResponse} from "../models/login-response";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    // Send a request to the server to authenticate the user
    return this.http.post<LoginResponse>('/auth/login', {username, password}).subscribe(response => {
      // Save the response token into local storage
      const token = response.access_token;
      localStorage.setItem('token', token);
    });
  }

  logout() {
    // Send a request to the server to log out the user
    return this.http.post('/auth/logout', {}).subscribe(() => {
      // Remove login data from local storage
      localStorage.removeItem('token');
    });
  }
}
