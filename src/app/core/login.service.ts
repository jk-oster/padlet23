import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginResponse} from "../models/login-response";
import {UserResponse} from "../models/user-response";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  refreshTimeoutId: any;
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    // Send a request to the server to authenticate the user
    return this.http.post<LoginResponse>('/auth/login', {username, password}).subscribe(response => {
      // Save the response token into local storage
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('expires_in', JSON.stringify(response.expires_in));
      this.startRefreshTokenTimer();
    });
  }

  startRefreshTokenTimer() {
    const token = localStorage.getItem('token');
    const expires_in = localStorage.getItem('expires_in'); // in seconds
    if(token && expires_in) {
      // set a timeout to refresh the token a minute before it expires
      const timeout = Number(JSON.parse(expires_in)) * 1000 - 60 * 1000; // in milliseconds
      this.refreshTimeoutId = setTimeout(() => this.refresh(), timeout);
    }
  }

  logout() {
    // Send a request to the server to log out the user
    return this.http.post('/auth/logout', {}).subscribe(() => {
      // Remove login data from local storage & stop timer
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('expires_in');
      clearTimeout(this.refreshTimeoutId);
    });
  }

  getCurrentUser() {
    // Send a request to the server to get user data
    return this.http.get<UserResponse>('/auth/user').subscribe(response => {
      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify(response));
    });
  }

  refresh() {
    return this.http.get<LoginResponse>('/auth/refresh').subscribe(response => {
      // Save the response token into local storage & restart timer
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('token_expires_in', JSON.stringify(response.expires_in));
      this.startRefreshTokenTimer();
    });
  }
}
