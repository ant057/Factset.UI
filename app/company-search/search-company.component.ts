//angular
import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';
//services
import {CompanySearchService} from './shared/company-search.service';
//models
import {CompanySearch, CompanyList, SearchParams, Industry, Country, SIC, EntityType, Sector} from './shared/company-search.models';

import {Observable}        from 'rxjs/Observable';
import {Subject}           from 'rxjs/Subject';


@Component({
    selector: 'search-company',
    templateUrl: 'app/company-search/search-company.component.html'
})
export class SearchCompanyComponent implements OnInit {

    searchCompaniesResult: Observable<CompanyList[]>;
    private searchTerms = new Subject<string>();

    constructor(private companySearchProvider: CompanySearchService,
        private router: Router) {
    }

    //what is going on here..
    ngOnInit() {
        this.searchCompaniesResult = this.searchTerms
            .debounceTime(200)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.companySearchProvider.search(term)
                // or the observable of empty companies if no search term
                : Observable.of<CompanyList[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<CompanyList[]>([]);
            });
    }

    // Push a search term into the observable stream. 
    search(term: string): void {
        this.searchTerms.next(term);
    }

    gotoDetail(company): void {
        let link = ['/company', company.permanentSecurityID];
        this.router.navigate(link);
    }
}