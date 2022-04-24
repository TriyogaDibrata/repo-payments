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
import { AuthGuard } from './_guards/auth.guard';
import { PaymentsDetailComponent } from './_pages/payments-detail/payments-detail.component';
import { AccessComponent } from './components/access/access.component';
import { RoleGuard } from './_guards/role.guard';

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
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'customer',
                canActivate: [RoleGuard],
                component: CustomerComponent
            },
            {
                path: 'package',
                canActivate: [RoleGuard],
                component: PackageComponent
            },
            {
                path: 'user',
                canActivate: [RoleGuard],
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
                path: 'payments-detail/:id',
                component: PaymentsDetailComponent
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'restricted',
        component: AccessComponent
    },
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full'
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
