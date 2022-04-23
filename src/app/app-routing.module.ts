import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './_auth/login/login.component';
import { AppMainComponent } from './_layouts/app.main.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { CustomerComponent } from './_pages/customer/customer.component';
import { PackageComponent } from './_pages/package/package.component';
import { UsersComponent } from './_pages/users/users.component';
import { PaymentComponent } from './_pages/payment/payment.component';
import { ProfileComponent } from './_pages/profile/profile.component';

const config : ExtraOptions = {
    useHash : false
}
export const routes : Routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'app',
        component: AppMainComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'customer',
                component: CustomerComponent
            },
            {
                path: 'package',
                component: PackageComponent
            },
            {
                path: 'user',
                component: UsersComponent
            },
            {
                path: 'payment',
                component: PaymentComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
