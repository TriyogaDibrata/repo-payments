import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './_auth/login/login.component';
import { AppMainComponent } from './_layouts/app.main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
