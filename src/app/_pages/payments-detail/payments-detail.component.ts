import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/_interfaces/customer';
import { Package } from 'src/app/_interfaces/package';
import { PaymentsService } from 'src/app/_requests/payments.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payments-detail',
  templateUrl: './payments-detail.component.html',
  providers: [MessageService],
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class PaymentsDetailComponent implements OnInit {

  customer_id : any;
  date_year : Date;
  customer : Customer;
  package : Package;
  payments : any;
  payment : any;
  bulans = [1,2,3,4,5,6,7,8,9,10,11,12];
  bulanStr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustust', 'September', 'Oktober', 'November', 'Desember'];
  display : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private paymentSvc : PaymentsService,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.date_year = new Date();
    this.customer_id = this.route.snapshot.paramMap.get('id');
    this.getPaymentsDetail(this.customer_id, moment(this.date_year).format('YYYY'));
  }

  getPaymentsDetail(id, year) {
    this.paymentSvc.getPaymentsDetail(id, year)
    .subscribe((data) => {
      this.customer = data['data']['customer'];
      this.package = data['data']['package'];
      this.payments = data['data']['payments'];
    })
  }

  onChange(ev) {
    this.getPaymentsDetail(this.customer_id, moment(this.date_year).format('YYYY'));
  }

  print(item) {
    this.display = true;
    this.payment = item[0];
  }

  setToPaid(bln) {
    this.paymentSvc.createPayment(this.customer_id, this.package.id, bln, moment(this.date_year).format('YYYY'))
    .subscribe((res) => {
      if(res && res['success']) {
        this.messageService.add({severity: 'success', summary: 'Success', detail: res['msg']});
        this.ngOnInit();
      }
    })
  }

}
