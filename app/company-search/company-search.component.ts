import {Component}       from '@angular/core';

import {SearchComponent} from './search.component';
import {CompanySearchService} from './shared/company-search.service';

@Component({
    selector: 'company-search',
    templateUrl: 'app/company-search/company-search.component.html',
    directives: [SearchComponent],
    providers: [CompanySearchService]
})
export class CompanySearchComponent{
    
}