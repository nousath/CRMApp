import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {throwError} from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  API_ENDPOINT = environment.apiEndpoint;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token');
    const url = req.url;
    //req.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
   // req.headers.set('Access-Control-Allow-Credentials', 'true');
    //{ headers: req.headers.set('Authorization', `Bearer ${token}`) }
    // {headers: req.headers.set('Access-Control-Allow-Origin', 'http://localhost:4203')}
    const clonedRequest = req.clone();
    return next.handle(clonedRequest).pipe(
      catchError(err => {
        if(err.status === 401) {
          this.router.navigate(['login']);
        }
        return throwError(err)
      }
    ));
  }
}