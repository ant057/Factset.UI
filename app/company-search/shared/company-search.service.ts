import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanySearchService {
    
    private apiUrl: string = 'app/company-search/shared/industries.json';

    constructor(private http: Http) { 

    }

    getIndustries() : Promise<{}[]>{
        return this.http.get(this.apiUrl)
        .toPromise()
        .then(response => response.json().data)
        .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An Error Occurred ', error);
        return Promise.reject(error.message || error);
    }

}