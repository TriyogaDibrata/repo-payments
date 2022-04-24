import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(
    private http : HttpClient
  ) { }

  getPackages() {
    return this.http.get(`${environment.url}` + 'packages')
    .pipe();
  }

  storePackage(body) {
    return this.http.post(`${environment.url}` + 'packages', body)
    .pipe();
  }

  updatePackage(id, params) {
    return this.http.put(`${environment.url}packages/` + id, {}, {params : params})
    .pipe();
  }

  deletePackage(id) {
    return this.http.delete(`${environment.url}packages/` + id)
    .pipe();
  }
}
