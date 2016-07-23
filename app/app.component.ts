import {Component}       from '@angular/core';

//providers
//import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {ROUTER_DIRECTIVES} from '@angular/router';
//compnents
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompanySearchComponent} from './company-search/company-search.component'
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
//services
import {CompanySearchService} from './company-search/shared/company-search.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, AlertComponent],
    providers: [
        //ROUTER_PROVIDERS,
        CompanySearchService
    ]
})
/*@RouteConfig([
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
])*/
export class AppComponent {
    title = 'Factset UI';
}
