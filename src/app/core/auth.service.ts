import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from "../models/login";
import {User} from "../models/user";
import {Observable, lastValueFrom} from "rxjs";
import {Padlet} from "../models/padlet";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refreshTimeoutId: any;

  constructor(private http: HttpClient) {
    AuthService.init();
  }

  public static init() {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', '');
    }
    if (!localStorage.getItem('expires_in')) {
      localStorage.setItem('expires_in', '');
    }
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', '');
    }
  }

  public get isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const expired = token ? !this.isTokenExpired(token) : true;
    return !expired;
  }

  public isAuthenticated$(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const token = localStorage.getItem('token');
      const expired = token ? !this.isTokenExpired(token) : true;
      observer.next(!expired);
      observer.complete();
    });
  }

  private isTokenExpired(token: string): boolean {
    if (!token) {
      return true; // Token is considered expired if it's null or undefined
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
    if (!decodedToken || !decodedToken.exp) {
      return true; // Token is considered expired if it doesn't contain an "exp" property
    }

    const expirationTime = new Date(decodedToken.exp * 1000); // Convert the expiration time to a Date object

    return expirationTime.getTime() > Date.now(); // Return true if the expiration time is in the past, false otherwise
  }

  public get user(): User | null {
    if (this.isAuthenticated) {
      try {
        return JSON.parse(localStorage.getItem('user') ?? '');
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  public async loginRequest(email: string, password: string): Promise<Login> {
    // Send a request to the server to authenticate the user
    const response = await lastValueFrom(this.http.post<Login>('/auth/login', {email, password}));
    // Save the response token into local storage
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('expires_in', JSON.stringify(response.expires_in));
    this.startRefreshTokenTimer();
    this.fetchUser();
    return response;
  }

  public async login(email: string, password: string): Promise<Login> {
    // return this.throttledLogin(email, password);
    return this.loginRequest(email, password);
  }


  // throttledLogin = Utils.throttle((email: string, password: string) => this.loginRequest(email, password), 1000);


  private startRefreshTokenTimer(): void {
    const token = localStorage.getItem('token');
    const expires_in = localStorage.getItem('expires_in'); // in seconds
    if (token && expires_in) {
      // set a timeout to refresh the token a minute before it expires
      const timeout = Number(JSON.parse(expires_in)) * 1000 - 60 * 1000; // in milliseconds
      this.refreshTimeoutId = setTimeout(() => this.refresh(), timeout);
    }
  }

  public async logout() {
    // Send a request to the server to log out the user
    const response = await lastValueFrom(this.http.post('/auth/logout', {}));

    console.log(response);
    // Remove login data from local storage & stop timer
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    localStorage.setItem('expires_in', '');
    clearTimeout(this.refreshTimeoutId);

    return response;

  }

  public async fetchUser(): Promise<User> {
    // Send a request to the server to log out the user
    const response = await lastValueFrom(this.http.get<User>('/auth/me'));
    console.log(response);
    localStorage.setItem('user', JSON.stringify(response));
    return response;
  }

  public searchUsers(searchTerm: string): Observable<User[]> {
    // Send a request to the server to log out the user
    return this.http.get<User[]>('/search/user/' + searchTerm);
  }

  private async refresh(): Promise<Login> {
    const response: Login = await lastValueFrom(this.http.get<Login>('/auth/refresh'));
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('expires_in', JSON.stringify(response.expires_in));
    this.startRefreshTokenTimer();
    return response;
  }

  isOwner(padlet: Padlet): boolean {
    return padlet.user_id === this.user?.id;
  }

  isAdmin(padlet: Padlet): boolean {
    // @ts-ignore
    return this.isOwner(padlet) || padlet?.padlet_user?.find(pu => pu.id === this.user?.id)?.pivot.permission_level === 4;
  }
}
