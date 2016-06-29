import {Component, OnInit} from '@angular/core';
import {Industries} from './industries.data'

@Component({
    selector: 'search',
    templateUrl: 'app/+company-search/search.component.html',
    providers: [Industries]
})
export class SearchComponent implements OnInit{

    industries: {}[];
    constructor(private industryProvider: Industries){

    }

    ngOnInit(){
        this.industries = this.industryProvider.industries;
    }
}