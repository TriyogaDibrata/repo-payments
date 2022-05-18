import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/_interfaces/customer';
import { Package } from 'src/app/_interfaces/package';
import { PaymentsService } from 'src/app/_requests/payments.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { PrintService, UsbDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
import { CurrencyPipe } from '@angular/common';

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
  bulanStr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  display : boolean = false;
  status : boolean = false;
  usbPrintDriver: UsbDriver;

  constructor(
    private route : ActivatedRoute,
    private paymentSvc : PaymentsService,
    private messageService : MessageService,
    private printService : PrintService,
    private currencyPipe : CurrencyPipe
  ) {
    this.usbPrintDriver = new UsbDriver();
    this.printService.isConnected.subscribe((res) => {
      this.status = res;
      if(res) {
        console.log('Printer is connected');
      } else {
        console.log('Printer is not connected');
      }
    })
   }

  ngOnInit(): void {
    this.date_year = new Date();
    this.customer_id = this.route.snapshot.paramMap.get('id');
    this.getPaymentsDetail(this.customer_id, moment(this.date_year).format('YYYY'));
    moment.locale('id');
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
  
  requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe((res) => {
      this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
    })
  }
  
  printReciept(driver : PrintDriver) {
    let print = this.printService.init();
    
    //title
    print.setBold(true)
    .setSize('18')
    .setJustification('center')
    .writeLine('Internet Desa')
    .writeLine('Petang')
    
    //separator
    print.setJustification('center')
    .setSize('normal')
    .setBold(true)
    .writeLine("--------------------------------");
    
    //header customer
    print.setSize('normal')
    .setJustification('left')
    .writeLine('Nama Pelanggan: '+ this.payment.cust_name);
    
    //header date
    print.setSize('normal')
    .setJustification('left')
    .writeLine('Tanggal       : '+ moment(this.payment.date_of_issued).format('DD MMMM YYYY'));
    
    //header time
    print.setSize('normal')
    .setJustification('left')
    .writeLine('Waktu         : '+ moment(this.payment.date_of_issued).format('HH:mm:ss'));
    
    //header service
    print.setSize('normal')
    .setJustification('left')
    .writeLine('Jenis Layanan : '+ this.payment.package_name);
    
    
    //separator
    print.setJustification('center')
    .setSize('normal')
    .setBold(true)
    .writeLine("--------------------------------");
    
    //body
    print.setSize('normal')
    .setJustification('left')
    .writeLine("Pembayaran bulan "+ this.bulanStr[this.payment.bulan]);
    
    //price
    print.setSize('normal')
    .setJustification('right')
    .writeLine(this.currencyPipe.transform(this.payment.price, 'IDR'));
    
    //separator
    print.setJustification('center')
    .setBold(true)
    .writeLine("================================");
    
    //total
    print.setBold(true)
    .setJustification('left')
    .writeLine('Total')
    .setJustification('right')
    .writeLine(this.currencyPipe.transform(this.payment.price, 'IDR'));
    
    //separator
    print.setJustification('center')
    .setBold(true)
    .writeLine("================================");
    
    print.setJustification('center')
    .setBold(true)
    .setSize('18')
    .writeLine('Terimakasih')
    .writeLine('*****');
    
    //startprinting
    print.feed(4)
    .cut('full')
    .flush();
  }

}
