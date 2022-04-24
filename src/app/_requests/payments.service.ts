import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http : HttpClient
  ) { }

  getCustomers() {
    return this.http.get(`${environment.url}` + 'payments-customers')
    .pipe();
  }

  getPaymentsDetail(id, year='') {
    let params = {
      id : id,
      year : year
    };
    return this.http.get(`${environment.url}` + 'payments-detail', {params : params})
    .pipe();
  }

  createPayment(customer_id, package_id, bulan, tahun){
    let body = {
      customer_id : customer_id,
      package_id : package_id,
      bulan : bulan,
      tahun : tahun
    };

    return this.http.post(`${environment.url}` + 'payments-create', body).pipe();
  }
}
