import {Component, OnInit} from '@angular/core';

import {CompanySearchService} from './shared/company-search.service';
import {CompanySearch} from './shared/company-search.models';

@Component({
    selector: 'company-list',
    templateUrl: 'app/company-search/company-list.component.html'
})
export class CompanyListComponent implements OnInit {

    companies: CompanySearch[];
    loading: boolean = false;

    constructor(private companySearchProvider: CompanySearchService) {
    //
    }

    ngOnInit() {
        this.bindTemplate();
    }

    bindTemplate() {
        this.loading = true;
        //get vm data back from service
        this.getCompanies();
    }

    getCompanies() {
        this.companySearchProvider.getCompanies()
            .then(response => this.successHandler(response))
            .catch(error => this.logError(error));
    }

    successHandler(response: any) {
        this.companies = response;
        this.loading = false;
    }

    logError(error: any) {
        console.error('error inside form bind OnInit ' + error);
    }
}