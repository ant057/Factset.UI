//angular
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

//models
import {CompanyList, PagedCompanyList, Industry, Sector, EntityType, Country, SIC, CompanySearch} from './company-search.models';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanySearchService {
    
    private mockApiUrl: string = 'app/company-search/shared/industries.json';
    private apiUrlBase: string = 'http://localhost:54665/api/';
    private apiUrl: string = this.apiUrlBase + 'CompanySearch/';

    private _pagedCompanyList: PagedCompanyList;
    private _companyList: CompanyList[]; 
    private _companySearch: CompanySearch;

    constructor(private http: Http) { 
        this._pagedCompanyList = new PagedCompanyList;
    }

    getIndustries() : Promise<{}[]>{
        return this.http.get(this.mockApiUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
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