import {Component}       from '@angular/core';

import {SearchComponent} from './search.component';

@Component({
    selector: 'company-search',
    templateUrl: 'app/+company-search/company-search.component.html',
    directives: [SearchComponent]
})
export class CompanySearchComponent{
    
}