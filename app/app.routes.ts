//angular
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//compnents
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompanySearchComponent} from './company-search/company-search.component';
import {CompanyDetailComponent} from './company/company-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/companysearch', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'companysearch', component: CompanySearchComponent },
    { path: 'company/:permanentSecurityId', component: CompanyDetailComponent }//,
    //{ path: 'company/:permanentsecurityid', component: CompanyDetailComponent }//,
    //{ path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
