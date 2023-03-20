import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

/**
 * Middleware ~ Interceptor to set REST API headers and Authorization header
 * if token is present in localStorage
 * @see https://angular.io/guide/http#intercepting-all-requests-or-responses
 */
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    // Set REST API headers
    const newReq = req.clone({
      headers: req.headers
        .set('Content-Type', `application/json`)
        .set('Accept', `application/json`)
    });

    // Set Authorization header
    if (token) {
      const authReq = req.clone({
        headers: newReq.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }
    return next.handle(newReq);
  }
}

