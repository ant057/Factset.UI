//angular
import {Component, OnInit}       from '@angular/core';

//components
import {SearchComponent} from './search.component';
import {CompanyListComponent} from './company-list.component';
//services
import {CompanySearchService} from './shared/company-search.service';
//models
import {CompanySearch} from './shared/company-search.models';

@Component({
    selector: 'company-search',
    templateUrl: 'app/company-search/company-search.component.html'
})
export class CompanySearchComponent implements OnInit{

    constructor(private companySearchProvider: CompanySearchService) {
        //something
    }

    ngOnInit() {
        this.bindTemplate();
    }

    bindTemplate() {
        // get vm for this and child components
        //this.companySearchProvider.getCompaniesAll();
    }

}