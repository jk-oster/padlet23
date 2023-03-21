import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

/**
 * Middleware ~ Interceptor Service
 * - sets REST API headers and Authorization header when JWT token is present in localStorage
 * - prepends REST API base url to requests
 * @see https://angular.io/guide/http#intercepting-all-requests-or-responses
 */
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    const newReq = req.clone({
      // Set REST API headers
      headers: req.headers
        .set('Content-Type', `application/json`)
        .set('Accept', `application/json`),
      // Prepend REST API base url
      url: 'http://padlet.s2010456022.student.kwmhgb.at/api' + req.url,
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
