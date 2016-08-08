//angular
import { provideRouter, RouterConfig } from '@angular/router';

//compnents
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompanySearchComponent} from './company-search/company-search.component';
import {CompanyDetailComponent} from './company/company-detail.component';

const routes: RouterConfig = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'companysearch', component: CompanySearchComponent },
    { path: 'company/:permanentSecurityId', component: CompanyDetailComponent }//,
    //{ path: 'company/:permanentsecurityid', component: CompanyDetailComponent }//,
    //{ path: '**', component: PageNotFoundComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];
