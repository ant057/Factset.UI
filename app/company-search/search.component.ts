//angular
import {Component, OnInit} from '@angular/core';
//services
import {CompanySearchService} from './shared/company-search.service';
//components
import {AutoCompleteComponent} from './shared/auto-complete.component';
import {SELECT_DIRECTIVES} from 'ng2-select';
//models
import {CompanySearch} from './shared/company-search.models';

@Component({
    selector: 'search',
    templateUrl: 'app/company-search/search.component.html',
    directives: [AutoCompleteComponent, SELECT_DIRECTIVES]
})
export class SearchComponent implements OnInit{

    companySearch: CompanySearch;
    private value: any;

    public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
        'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
        'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Dusseldorf',
        'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
        'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'todz', 'London', 'Krakow', 'Madrid',
        'Mlaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
        'Paris', 'Poznan', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
        'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
        'Vilnius', 'Warsaw', 'Wroclaw', 'Zagreb', 'Zaragoza'];

    constructor(private companySearchProvider: CompanySearchService) {
        this.companySearch = new CompanySearch;
    }

    ngOnInit(){
        this.bindTemplate();
    }

    bindTemplate(){
        this.getCompanySearchModel();
    }

    getCompanySearchModel(){
        this.companySearchProvider.getCompanySearchModel()
            .then(response => this.successHandler(response))
            .catch(error => this.logError(error));
    }

    successHandler(response: any) {
        this.companySearch.countries = response.countries;
        this.companySearch.entityTypes = response.entityTypes;
        this.companySearch.industries = response.industries;
        this.companySearch.sectors = response.sectors;
        this.companySearch.sics = response.siCs;
        console.warn(this.companySearch);
    }

    logError(error: any){
        console.error('error inside form bind OnInit ' + error);
    }

    public selected(value: any): void {
        console.log('Selected value is: ', value);
    }

    public removed(value: any): void {
        console.log('Removed value is: ', value);
    }

    public refreshValue(value: any): void {
        this.value = value;
    }

    public itemsToString(value: Array<any> = []): string {
        return value
            .map((item: any) => {
                return item.text;
            }).join(',');
    }
}