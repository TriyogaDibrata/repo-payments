import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Package } from 'src/app/_interfaces/package';
import { PackageService } from 'src/app/_requests/package.service';
import { RefService } from 'src/app/_requests/ref.service';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['../../../assets/demo/badges.scss'],
    providers: [MessageService, ConfirmationService]
})
export class PackageComponent implements OnInit {
    //new
    packageDialog: boolean;
    packages: Package[];
    package: Package;
    selectedPackages: Package[];
    deletePackageDialog: boolean = false;
    deletepackagesDialog: boolean = false;
    rowsPerPageOptions = [5, 10, 20];
    cols: any[];
    submitted: boolean;

    constructor(
        private packageSvc: PackageService,
        private refSvc: RefService,
        private messageService: MessageService) { }

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'desc', header: 'Desc' },
            { field: 'price', header: 'Price' }
        ];

        this.getPackages();
    }

    getPackages() {
        this.packageSvc.getPackages().subscribe((data) => {
            this.packages = data['data'];
        })
    }

    openNew() {
        this.package = {};
        this.submitted = false;
        this.packageDialog = true;
    }

    editPackage(item: Package) {
        this.package = { ...item };
        this.packageDialog = true;
    }

    deletePackage(item: Package) {
        this.deletePackageDialog = true;
        this.package = { ...item }
    }

    confirmDelete() {
        this.packageSvc.deletePackage(this.package.id).subscribe((res) => {
            if (res && res['success']) {
                this.deletePackageDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res['msg'] });
                this.ngOnInit();
            }
        })
    }

    hideDialog() {
        this.packageDialog = false;
        this.submitted = false;
    }

    savePackage() {
        this.submitted = true;
        if (this.package.id) {
            let params = {
                'name': this.package.name,
                'desc': this.package.desc,
                'price': this.package.price
            }

            this.packageSvc.updatePackage(this.package.id, params).subscribe((res) => {
                if (res && res['success']) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: res['msg'] });
                    this.packageDialog = false;
                    this.ngOnInit();
                }
            })
        } else {
            let body = {
                'name': this.package.name,
                'desc': this.package.desc,
                'price': this.package.price
            };

            this.packageSvc.storePackage(body).subscribe((res) => {
                if (res && res['success']) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: res['msg'] });
                    this.packageDialog = false;
                    this.ngOnInit();
                }
            })
        }
    }
}