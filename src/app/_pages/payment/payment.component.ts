import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/_interfaces/customer';
import { PaymentsService } from 'src/app/_requests/payments.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  providers: [MessageService,ConfirmationService],
  //styleUrls: ['./payment.component.scss']
  styleUrls: ['../../../assets/demo/badges.scss'],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})
export class PaymentComponent implements OnInit {

  customers : Customer[];
  customer : Customer;
  loading : boolean = true;

  constructor(
    private paymentSvc : PaymentsService
  ){}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.paymentSvc.getCustomers().subscribe((data) => {
      this.customers = data['data'];
      this.loading = false;
    })
  }

  clear(table : Table) {
    table.clear();
  }
}