import {Component, OnInit} from '@angular/core';
import {CompanySearchService} from './shared/company-search.service';

@Component({
    selector: 'search',
    templateUrl: 'app/company-search/search.component.html'
})
export class SearchComponent implements OnInit{

    industries: {}[];
    constructor(private companySearchProvider: CompanySearchService){

    }

    ngOnInit(){
        this.bindTemplate();
    }

    bindTemplate(){
        this.getIndustries();
    }

    getIndustries(){
        this.companySearchProvider.getIndustries()
            .then(response => this.industries = response)
            .catch(error => this.logError(error));
    }

    logError(error: any){
        console.error('error inside form bind OnInit ' + error);
    }
}