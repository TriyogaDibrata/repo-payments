import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_requests/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private auth : AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.auth.currentUserValue;

    const url = req.url.startsWith(environment.url);

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',            
    };

  if(user && url) {
    headers['Authorization'] = `Bearer ${user.access_token}`;
  }

  req = req.clone({
    setHeaders : headers,
    withCredentials : true
  });

  return next.handle(req);
  }
}
