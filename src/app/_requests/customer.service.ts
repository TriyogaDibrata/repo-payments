import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http : HttpClient
  ) { }

  getCustomers() {
    return this.http.get(`${environment.url}` + 'customers')
    .pipe();
  }

  storeCustomer(body) {
    return this.http.post(`${environment.url}` + `customers`, body)
    .pipe();
  }

  updateCustomer(id, params) {
    return this.http.put(`${environment.url}customers/` + id, {}, {params : params})
    .pipe();
  }

  deleteCustomer(id) {
    return this.http.delete(`${environment.url}customers/` + id)
    .pipe();
  }
}
