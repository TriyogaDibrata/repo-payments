import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { MenuItem } from 'primeng/api';
import { User } from '../_interfaces/user';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[];
    user: User;

    constructor(
        public appMain: AppMainComponent
    ) { }
}
