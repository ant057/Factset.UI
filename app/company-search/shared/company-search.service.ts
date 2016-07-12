import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {CompanySearch} from './company-search.models';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanySearchService {
    
    private mockApiUrl: string = 'app/company-search/shared/industries.json';
    private apiUrlBase: string = 'http://localhost:54665/api/';
    private apiUrl: string = this.apiUrlBase + 'CompanySearch/';

    constructor(private http: Http) { 
        //does this compile??
    }

    getIndustries() : Promise<{}[]>{
        return this.http.get(this.mockApiUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getCompanies() : Promise<CompanySearch[]> {
        return this.http.get(this.apiUrl + 'SearchCompanies')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An Error Occurred ', error);
        return Promise.reject(error.message || error);
    }
}