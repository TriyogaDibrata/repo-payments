import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject : BehaviorSubject<User>;
  currentUser : Observable<User>;

  constructor(
    private http :HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
   }
  
  login(body) {
    return this.http.post<any>(environment.url + 'login', body)
    .pipe(map((res) => {
      if(res && res.access_token) {
        this.storeUser(res);
      }
      return res;
    }));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  
  storeUser(res) {
    let user = {
      id : res.user.id,
      email : res.user.email,
      name : res.user.name,
      username : res.user.username,
      created_at : res.user.created_at,
      access_token : res.access_token,
      role : res.user.role
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logOut() {
    return this.http.post(`${environment.url}` + 'logout', {})
    .pipe(map((res) => {
      if(res && res['success']) {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      }
      return res;
    }));
  }

  getUser() {
    return this.http.get(`${environment.url}` + 'user')
    .pipe();
  }
}
