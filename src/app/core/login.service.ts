import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from "../models/login";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  refreshTimeoutId: any;

  constructor(private http: HttpClient) {
  }

  static isLoggedIn(): boolean {
    return !!localStorage.getItem('token') &&
      !!localStorage.getItem('expires_in') &&
      !!localStorage.getItem('user')
  }

  static user(): User | null {
    if (LoginService.isLoggedIn()) {
      return JSON.parse(localStorage.getItem('user') ?? '');
    }
    return null;
  }

  login(username: string, password: string): Observable<Login> {
    // Send a request to the server to authenticate the user
    const login = this.http.post<Login>('/auth/login', {username, password})
    login.subscribe(response => {
      // Save the response token into local storage
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('expires_in', JSON.stringify(response.expires_in));
      this.startRefreshTokenTimer();
    });
    return login;
  }

  startRefreshTokenTimer(): void {
    const token = localStorage.getItem('token');
    const expires_in = localStorage.getItem('expires_in'); // in seconds
    if (token && expires_in) {
      // set a timeout to refresh the token a minute before it expires
      const timeout = Number(JSON.parse(expires_in)) * 1000 - 60 * 1000; // in milliseconds
      this.refreshTimeoutId = setTimeout(() => this.refresh(), timeout);
    }
  }

  logout() {
    // Send a request to the server to log out the user
    const logout = this.http.post('/auth/logout', {});
    logout.subscribe(() => {
      // Remove login data from local storage & stop timer
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('expires_in');
      clearTimeout(this.refreshTimeoutId);
    });
    return logout;
  }

  fetchUser(): Observable<User> {
    // Send a request to the server to get user data
    const user = this.http.get<User>('/auth/user');
    user.subscribe(response => {
      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify(response));
    });
    return user;
  }

  refresh(): Observable<Login> {
    const refresh = this.http.get<Login>('/auth/refresh');
    refresh.subscribe(response => {
      // Save the response token into local storage & restart timer
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('expires_in', JSON.stringify(response.expires_in));
      this.startRefreshTokenTimer();
    });
    return refresh;
  }
}
