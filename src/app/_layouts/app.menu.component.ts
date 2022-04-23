import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Menu',
                items:[
                    {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/app/dashboard']},
                    {label: 'Pelanggan', icon: 'pi pi-fw pi-users', routerLink: ['/app/customer']},
                    {label: 'Paket Layanan Internet', icon: 'pi pi-fw pi-wallet', routerLink: ['/app/package']},
                    {label: 'Kelola Pengguna', icon: 'pi pi-fw pi-user', routerLink: ['/app/user']},
                    {label: 'Pembayaran', icon: 'pi pi-fw pi-credit-card', routerLink: ['/app/payment']},
                    {label: 'Profile', icon: 'pi pi-fw pi-user-edit', routerLink: ['/app/profile']}
                ]
            }
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
