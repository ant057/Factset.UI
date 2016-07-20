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
    templateUrl: 'app/company-search/company-search.component.html',
    directives: [SearchComponent, CompanyListComponent]
})
export class CompanySearchComponent implements OnInit{

    public toggled: boolean = false;
    public toggleValue: string = '<';

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