import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  header = {
    'Accept' : 'application/json'
  }

  constructor(
    private http :HttpClient
  ) { }
  
  login(body) {
    return this.http.post<any>(environment.url + 'login', body, {headers : this.header})
    .pipe();
  }
}
