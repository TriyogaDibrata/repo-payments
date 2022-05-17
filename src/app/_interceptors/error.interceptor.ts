import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AuthService } from '../_requests/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService : AuthService,
    private router : Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error : HttpErrorResponse) : Observable<any> => {
        if(error.status === 401 || error.status === 403) {
          this.authService.clearUser();
          this.router.navigate(['/auth/login']);
          return throwError(error);
        }

        return throwError(error);
      })
    )
  }
}