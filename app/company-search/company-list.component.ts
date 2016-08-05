//angular
import { Component, OnInit, Input } from '@angular/core';
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
    @Input() companies: CompanyList[];
    @Input() loading: boolean = false;
    @Input() page: number = 1;
    @Input() pageSize: number = 25;
    @Input() total: number;

    public toggled: boolean = false;
    public toggleValue: string = '<';

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
        this.getCompanyPage(this.page);
    }

    getCompanyPage(page: number) {
        this.companySearchProvider.getCompanies(page, this.pageSize)
            .then(response => this.successHandler(response))
            .catch(error => this.logError(error));

        this.page = page;
    }

    successHandler(response: any) {
        this.pagedData = response;
        this.companies = response.data;
        this.total = response.count;
        this.loading = false;
    }

    logError(error: any) {
        console.error('error inside form bind OnInit ' + error);
    }

    anAlert() {
        window.alert('i wouldnt do that if i were you.."');
        this.router.navigate(['/company']);
    }

    toggle() {
        if (this.toggled) {
            this.toggled = false;
            this.toggleValue = '<';
        }
        else {
            this.toggled = true;
            this.toggleValue = '>';
        }
    }
}