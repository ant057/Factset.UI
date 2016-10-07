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
    selector: 'search',
    templateUrl: 'app/company-search/search.component.html'
})
export class SearchComponent implements OnInit{

    companySearch: CompanySearch;
    searchParams: SearchParams;
    private value: any;
    public industryItems: Array<string> = [];
    public industrySelectedItems: Array<any> = [];
    public countryItems: Array<string> = [];
    public countrySelectedItems: Array<any> = [];
    public sicItems: Array<string> = [];
    public sicSelectedItems: Array<any> = [];
    public entityTypeItems: Array<string> = [];
    public entitySelectedItems: Array<any> = [];
    public sectorItems: Array<string> = [];
    public sectorSelectedItems: Array<any> = [];

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
        this.searchParams = new SearchParams;
    }

    ngOnInit(){
        this.bindTemplate();
        this.bindSearchParams();
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

        //this.industrySelectedItems.push({
        //    id: 'Airlines',
        //    text: 'Airlines'
        //});
    }

    logError(error: any){
        console.error('error inside search component bind OnInit ' + error);
    }

    bindSearchParams() {
        this.searchParams = this.companySearchProvider.getSearchParams();
        if (this.searchParams.industries) {
            this.searchParams.industries.forEach(f => this.industrySelectedItems.push(f.industryDescription));
        }
        if (this.searchParams.countries) {
            this.searchParams.countries.forEach(f => this.countrySelectedItems.push(f.countryDescription));
        }
        if (this.searchParams.sectors) {
            this.searchParams.sectors.forEach(f => this.sectorSelectedItems.push(f.sectorDescription));
        }
        if (this.searchParams.sicCodes) {
            this.searchParams.sicCodes.forEach(f => this.sicSelectedItems.push(f.sicCode));
        }
        if (this.searchParams.entityTypes) {
            this.searchParams.entityTypes.forEach(f => this.entitySelectedItems.push(f.entityTypeDescription));
        }
        
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
        //console.log('Selected value: ', e.item);
    }

    getFilteredCompanies() {
        this.loading = true;
        this.companySearchProvider.getFilteredCompanies(this.page, this.pageSize)
            .then(response => this.getCompanyPageHandler(response))
            .catch(error => this.logError(error));
        this.page = null;
    }

    getCompanyPageHandler(response: any) {
        this.companies = response.data;
        this.companies.forEach(p => p.imgUrl = this.findPicture(p.sectorCode));
        this.total = response.count;
        this.page = 1;
        this.loading = false;
    }

    private findPicture(sector: string): string {
        switch (sector) {
            case '1100':
                return './app/assets/Coal.png';
            case '1200':
                return './app/assets/Deployment.png';
            case '1300':
                return './app/assets/Processor.png';
            case '1400':
                return './app/assets/Deployment.png';
            case '2100':
                return './app/assets/Electro Devices.png';
            case '2200':
                return './app/assets/Automatic.png';
            case '2300':
                return './app/assets/Electrical Sensor.png';
            case '2400':
                return './app/assets/Deployment.png';
            case '3100':
                return './app/assets/Whisky Still.png';
            case '3200':
                return './app/assets/Work.png';
            case '3250':
                return './app/assets/Deployment.png';
            case '3300':
                return './app/assets/Gyroscope.png';
            case '3350':
                return './app/assets/Electrical Sensor.png';
            case '3400':
                return './app/assets/Deployment.png';
            case '3500':
                return './app/assets/Industrial Scales.png';
            case '4600':
                return './app/assets/Fork Lift.png';
            case '4700':
                return './app/assets/Worker Male.png';
            case '4800':
                return './app/assets/Crowdfunding.png';
            case '4900':
                return './app/assets/Radio Tower.png';
            case '6000':
                return './app/assets/Processor.png';
            case '7000':
                return './app/assets/Warning Shield.png';
            case '9999':
                return './app/assets/Deployment.png';
            default:
                return './app/assets/Deployment.png';
        }
    }

}