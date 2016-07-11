import {Component}       from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {DashboardComponent} from './dashboard/dashboard.component';
import {CompanySearchComponent} from './company-search/company-search.component'

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
  ,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})
@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/companysearch',
        name: 'CompanySearch',
        component: CompanySearchComponent
    }
])
export class AppComponent {
    title = 'Factset UI';
}
