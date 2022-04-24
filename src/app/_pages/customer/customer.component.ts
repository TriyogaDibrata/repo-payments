import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Customer } from 'src/app/_interfaces/customer';
import { Package } from 'src/app/_interfaces/package';
import { CustomerService } from 'src/app/_requests/customer.service';
import { RefService } from 'src/app/_requests/ref.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    //new
    customerDialog: boolean;
    customers: Customer[];
    customer: Customer;
    packages: Package[];
    selectedPackage: any;
    selectedCustomers : Customer[];
    deleteCustomerDialog : boolean = false;
    deleteCustomersDialog : boolean = false;
    rowsPerPageOptions = [5, 10, 20];
    cols: any[];
    submitted: boolean;

    constructor(
        private customerSvc: CustomerService,
        private refSvc: RefService,
        private messageService: MessageService) { }

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'email', header: 'Email' },
            { field: 'phone', header: 'Phone' },
            { field: 'package', header: 'Package' },
            { field: 'status', header: 'Status' }
        ];

        this.getCustomer();
        this.getPackages();
    }

    getCustomer() {
        this.customerSvc.getCustomers().subscribe((data) => {
            this.customers = data['data'];
        })
    }

    getPackages() {
        this.refSvc.getAllPackages().subscribe((data) => {
            this.packages = data;
        })
    }

    openNew() {
        this.customer = {};
        this.submitted = false;
        this.customerDialog = true;
    }

    editCustomer(customer: Customer) {
        this.customer = { ...customer };
        this.customerDialog = true;
    }

    deleteCustomer(customer : Customer) {
        this.deleteCustomerDialog = true;
        this.customer = { ...customer }
    }

    confirmDelete() {
        this.customerSvc.deleteCustomer(this.customer.id).subscribe((res) => {
            if(res && res['success']) {
                this.deleteCustomerDialog = false;
                this.messageService.add({severity: 'success', summary: 'Success', detail: res['msg']});
                this.ngOnInit();
            }
        })
    }

    hideDialog() {
        this.customerDialog = false;
        this.submitted = false;
    }

    saveCustomer() {
        this.submitted = true;
        if (this.customer.id) {
            let params = {
                'name' : this.customer.name,
                'email' : this.customer.email,
                'phone' : this.customer.phone,
                'package_id' : this.customer.package_id
            }

            this.customerSvc.updateCustomer(this.customer.id, params).subscribe((res) => {
                if (res && res['success']) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: res['msg'] });
                    this.customerDialog = false;
                    this.ngOnInit();
                }
            })
        } else {
            let body = {
                'name': this.customer.name,
                'email': this.customer.email,
                'phone': this.customer.phone,
                'package_id': this.customer.package_id
            }
            this.customerSvc.storeCustomer(body).subscribe((res) => {
                if (res && res['success']) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: res['msg'] });
                    this.customerDialog = false;
                    this.ngOnInit();
                }
            });
        }
    }
}
