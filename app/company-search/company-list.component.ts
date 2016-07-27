//angular
import { Component, OnInit } from '@angular/core';
import { PaginatePipe, PaginationService, PaginationControlsCmp, IPaginationInstance } from 'ng2-pagination';
import { Router } from '@angular/router';

//services
import {CompanySearchService} from './shared/company-search.service';
//models
import {CompanyList, PagedCompanyList} from './shared/company-search.models';

@Component({
    selector: 'company-list',
    templateUrl: 'app/company-search/company-list.component.html',
    providers: [PaginationService],
    directives: [PaginationControlsCmp],
    pipes: [PaginatePipe]
})
export class CompanyListComponent implements OnInit {

    pagedData: PagedCompanyList;
    companies: CompanyList[];
    loading: boolean = false;
    private _page: number = 1;
    private _pageSize: number = 25;
    private _total: number;

    constructor(private companySearchProvider: CompanySearchService,
                private router: Router) {
    //
    }

    ngOnInit() {
        this.bindTemplate();
    }

    bindTemplate() {
        this.loading = true;
        //get vm data back from service
        this.getCompanyPage(this._page);
    }

    getCompanyPage(page: number) {
        this.companySearchProvider.getCompanies(page, this._pageSize)
            .then(response => this.successHandler(response))
            .catch(error => this.logError(error));

        this._page = page;
    }

    successHandler(response: any) {
        this.pagedData = response;
        this.companies = response.data;
        this._total = response.count;
        this.loading = false;
    }

    logError(error: any) {
        console.error('error inside form bind OnInit ' + error);
    }

    anAlert() {
        window.alert('i wouldnt do that if i were you.."');
        this.router.navigate(['/company']);
    }
}