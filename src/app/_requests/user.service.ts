import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient
  ) { }

  getUsers() {
    return this.http.get(`${environment.url}` + 'users')
    .pipe();
  }

  storeUser(body) {
    return this.http.post(`${environment.url}` + 'users', body)
    .pipe();
  }

  updateUser(id, params) {
    return this.http.put(`${environment.url}users/` + id, {}, {params : params})
    .pipe();
  }

  deleteUser(id) {
    return this.http.delete(`${environment.url}users/` + id)
    .pipe();
  }

  updatePassword(params) {
    return this.http.put(`${environment.url}` + 'update-password', {},{params : params})
    .pipe();
  }
}