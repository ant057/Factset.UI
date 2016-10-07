import { Component }       from '@angular/core';
//services
//import { CompanySearchService } from './company-search/shared/company-search.service';
//import { CompanyDetailService } from './company/shared/company-detail.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
    //providers: [
    //    CompanySearchService,
    //    CompanyDetailService
    //]
})
export class AppComponent {
    title = 'Factset Account Lookup';
}
