//angular
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

//models
import { CompanyList, PagedCompanyList, Industry, Sector, EntityType, Country, SIC, CompanySearch, SearchParams } from './company-search.models';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanySearchService {
    
    private mockApiUrl: string = 'app/company-search/shared/industries.json';
    private apiUrlBase: string = 'http://localhost:54665/api/';
    private apiUrl: string = this.apiUrlBase + 'CompanySearch/';

    private _pagedCompanyList: PagedCompanyList;
    private _companyList: CompanyList[]; 
    private _companySearch: CompanySearch;

    private _searchParams: SearchParams;

    constructor(private http: Http) { 
        this._pagedCompanyList = new PagedCompanyList;
        this._searchParams = new SearchParams;
    }

    getIndustries() : Promise<{}[]>{
        return this.http.get(this.mockApiUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    addCountryParam(country: Country) {
        if (this._searchParams.countries) {
        }
        else {
            this._searchParams.countries = new Array<Country>();
        }
        this._searchParams.countries.push(country);
    }

    removeCountryParam(country: Country) {
        this._searchParams.countries = this._searchParams.countries.filter(i => i.countryDescription !== country.countryDescription);
    }

    addSICParam(sic: SIC) {
        if (this._searchParams.sicCodes) {
        }
        else {
            this._searchParams.sicCodes = new Array<SIC>();
        }
        this._searchParams.sicCodes.push(sic);
    }

    removeSICParam(sic: SIC) {
        this._searchParams.sicCodes = this._searchParams.sicCodes.filter(i => i.sicCode !== sic.sicCode);
    }

    addEntityTypeParam(entitytype: EntityType) {
        if (this._searchParams.entityTypes) {
        }
        else {
            this._searchParams.entityTypes = new Array<EntityType>();
        }
        this._searchParams.entityTypes.push(entitytype);
    }

    removeEntityTypeParam(entitytype: EntityType) {
        this._searchParams.entityTypes = this._searchParams.entityTypes.filter(i => i.entityTypeDescription !== entitytype.entityTypeDescription);
    }

    addSectorParam(sector: Sector) {
        if (this._searchParams.sectors) {
        }
        else {
            this._searchParams.sectors = new Array<Sector>();
        }
        this._searchParams.sectors.push(sector);
    }

    removeSectorParam(sector: Sector) {
        this._searchParams.sectors = this._searchParams.sectors.filter(i => i.sectorDescription !== sector.sectorDescription);
    }

    addIndustryParam(industry: Industry) {
        if (this._searchParams.industries) {
        }
        else {
            this._searchParams.industries = new Array<Industry>();
        }
        this._searchParams.industries.push(industry);
    }

    removeIndustryParam(industry: Industry) {
        this._searchParams.industries = this._searchParams.industries.filter(i => i.industryDescription !== industry.industryDescription);
    }

    getCompanies(page: number, pageSize: number): Promise<PagedCompanyList> {
        //return company list data if we have
        if (this._companyList) {
            this._pagedCompanyList.count = this._companyList.length;
            this._pagedCompanyList.data = this._companyList.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize);
            return Promise.resolve(this._pagedCompanyList);
        } else { //else, get from server
            return this.http.get(this.apiUrl + 'GetAllCompanies')
                .toPromise()
                .then(response => {
                    this._companyList = response.json();
                    this._pagedCompanyList.data = this._companyList.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize);
                    this._pagedCompanyList.count = this._companyList.length;
                    return this._pagedCompanyList;
                })
                .catch(this.handleError);
        }
    }

    getFilteredCompanies(page: number, pageSize: number): Promise<PagedCompanyList> {
        let body: string;
        if (this._searchParams) {
            body = JSON.stringify(this._searchParams);
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

            return this.http.post(this.apiUrl + 'GetAllCompanies', body, options)
                .toPromise()
                .then(response => {
                    this._companyList = response.json();
                    this._pagedCompanyList.data = this._companyList.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize);
                    this._pagedCompanyList.count = this._companyList.length;
                    return this._pagedCompanyList;
                })
                .catch(this.handleError);
    }

    getCompanySearchModel(): Promise<CompanySearch> {
        if (this._companySearch) {
            return Promise.resolve(this._companySearch);
        }
        else {
            return this.http.get(this.apiUrl + 'GetCompanySearch')
                .toPromise()//
                .then(response => {
                    console.warn(response);
                    this._companySearch = new CompanySearch;
                    this._companySearch = response.json();
                    return this._companySearch;
                })
                .catch(this.handleError);
        }
    }

    getCompaniesAll(): Promise<any> {
        if (this._companyList) {
            return Promise.resolve(this._companyList);
        }
        else {
            return this.http.get(this.apiUrl + 'GetAllCompanies')
                .toPromise()
                .then(response => {
                    response.json();
                    this._companyList = response.json();
                })
                .catch(this.handleError);
        }
    }

    private successHandler(response: any, dataModel: any) {
        
    }

    private handleError(error: any) {
        console.error('An Error Occurred ', error);
        return Promise.reject(error.message || error);
    }
}