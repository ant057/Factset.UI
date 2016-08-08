//angular
import {Component, OnInit} from '@angular/core';
//services
import {CompanySearchService} from './shared/company-search.service';
//components
import {AutoCompleteComponent} from './shared/auto-complete.component';
import {SELECT_DIRECTIVES} from 'ng2-select';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';
import {FORM_DIRECTIVES} from '@angular/forms';
//models
import {CompanySearch, CompanyList, SearchParams, Industry, Country, SIC, EntityType, Sector} from './shared/company-search.models';

@Component({
    selector: 'search',
    templateUrl: 'app/company-search/search.component.html',
    directives: [AutoCompleteComponent, SELECT_DIRECTIVES,
        ACCORDION_DIRECTIVES, TYPEAHEAD_DIRECTIVES, FORM_DIRECTIVES]
})
export class SearchComponent implements OnInit{

    companySearch: CompanySearch;
    private value: any;
    public industryItems: Array<string> = [];
    public countryItems: Array<string> = [];
    public sicItems: Array<string> = [];
    public entityTypeItems: Array<string> = [];
    public sectorItems: Array<string> = [];

    public accordionOpen: boolean = true;

    public selected: string = '';
    public companyListArray: Array<string> = [];

    public companies: CompanyList[];
    public page: number = 1;
    public pageSize: number = 25;
    public total: number;
    public loading: boolean = false;
    
    constructor(private companySearchProvider: CompanySearchService) {
        this.companySearch = new CompanySearch;
    }

    ngOnInit(){
        this.bindTemplate();
    }

    alert() {
        window.alert('hi');
    }

    bindTemplate(){
        this.getCompanySearchModel();
       // this.getCompanies();
    }

    getCompanySearchModel(){
        this.companySearchProvider.getCompanySearchModel()
            .then(response =>  this.successHandler(response))
            .catch(error => this.logError(error));
    }

    getCompanies() {
        this.companySearchProvider.getCompaniesAll()
            .then(response => {
                for (var i = 0; i < response.length; i++) {
                    this.companyListArray.push(response[i].companyName);
                }
            })
            .catch(error => this.logError(error));
    }

    successHandler(response: any) {
        this.companySearch.countries = response.countries;
        this.companySearch.entityTypes = response.entityTypes;
        this.companySearch.industries = response.industries;
        this.companySearch.sectors = response.sectors;
        this.companySearch.sics = response.siCs;

        for (var i = 0; i < this.companySearch.industries.length; i++) {
            this.industryItems.push(this.companySearch.industries[i].industryDescription);
        }

        for (var i = 0; i < this.companySearch.sics.length; i++) {
            this.sicItems.push(this.companySearch.sics[i].sicCode + ' ' + this.companySearch.sics[i].sicDescription.substr(0, 20) + '..');
        }

        for (var i = 0; i < this.companySearch.entityTypes.length; i++) {
            this.entityTypeItems.push(this.companySearch.entityTypes[i].entityTypeDescription);
        }

        for (var i = 0; i < this.companySearch.countries.length; i++) {
            this.countryItems.push(this.companySearch.countries[i].countryDescription);
        }

        for (var i = 0; i < this.companySearch.sectors.length; i++) {
            this.sectorItems.push(this.companySearch.sectors[i].sectorDescription);
        }
    }

    logError(error: any){
        console.error('error inside search component bind OnInit ' + error);
    }

    public selectedIndustry(value: any): void {
        let industry: Industry = new Industry;
        industry.industryCode = value.id;
        industry.industryDescription = value.text;

        this.companySearchProvider.addIndustryParam(industry);
    }

    public removedIndustry(value: any): void {
        let industry: Industry = new Industry;
        industry.industryCode = value.id;
        industry.industryDescription = value.text;

        this.companySearchProvider.removeIndustryParam(industry);
    }

    public selectedCountry(value: any): void {
        let country: Country = new Country;
        country.isoCountry = value.id;
        country.countryDescription = value.text;

        this.companySearchProvider.addCountryParam(country);
    }

    public removedCountry(value: any): void {
        let country: Country = new Country;
        country.isoCountry = value.id;
        country.countryDescription = value.text;

        this.companySearchProvider.removeCountryParam(country);
    }

    public selectedSIC(value: any): void {
        let sic: SIC = new SIC;
        sic.sicCode = value.id;
        sic.sicDescription = value.text;

        this.companySearchProvider.addSICParam(sic);
    }

    public removedSIC(value: any): void {
        let sic: SIC = new SIC;
        sic.sicCode = value.id;
        sic.sicDescription = value.text;

        this.companySearchProvider.removeSICParam(sic);
    }

    public selectedEntityType(value: any): void {
        let entitytype: EntityType = new EntityType;
        entitytype.entityTypeCode = value.id;
        entitytype.entityTypeDescription = value.text;

        this.companySearchProvider.addEntityTypeParam(entitytype);
    }

    public removedEntityType(value: any): void {
        let entitytype: EntityType = new EntityType;
        entitytype.entityTypeCode = value.id;
        entitytype.entityTypeDescription = value.text;

        this.companySearchProvider.removeEntityTypeParam(entitytype);
    }

    public selectedSector(value: any): void {
        let sector: Sector = new Sector;
        sector.sectorCode = value.id;
        sector.sectorDescription = value.text;

        this.companySearchProvider.addSectorParam(sector);
    }

    public removedSector(value: any): void {
        let sector: Sector = new Sector;
        sector.sectorCode = value.id;
        sector.sectorDescription = value.text;

        this.companySearchProvider.removeSectorParam(sector);
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

    public typeaheadOnSelect(e: any): void {
        console.log('Selected value: ', e.item);
    }

    getFilteredCompanies() {
        this.loading = true;
        this.companySearchProvider.getFilteredCompanies(this.page, this.pageSize)
            .then(response => this.getCompanyPageHandler(response))
            .catch(error => this.logError(error));
    }

    getCompanyPageHandler(response: any) {
        this.loading = false;
        this.companies = response.data;
        this.total = response.count;
        this.page = 1;
    }

}