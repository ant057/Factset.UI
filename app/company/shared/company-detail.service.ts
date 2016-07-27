﻿//angular
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

//models
import { CompanyDetail } from './company-detail.models';
import { BalanceModel, FinancialDetail, Financial } from '../../financial/shared/financial.models';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanyDetailService {
    private mockApiUrl: string = 'app/company-search/shared/industries.json';
    private apiUrlBase: string = 'http://localhost:54665/api/';
    private apiUrl: string = this.apiUrlBase + 'Company/';

    private _companyDetail: CompanyDetail;

    constructor(private http: Http) {
 
    }

    getCompanyDetail(page: number, pageSize: number): Promise<CompanyDetail> {
        //return company list data if we have
        if (this._companyDetail) {
            //do stuff
            return Promise.resolve(this._companyDetail);
        } else { //else, get from server
            return this.http.get(this.apiUrl + 'GetCompanyDetail')
                .toPromise()
                .then(response => {
                    this._companyDetail = response.json();
                    //other?
                    return this._companyDetail;
                })
                .catch(this.handleError);
        }
    }

    private handleError(error: any) {
        console.error('An Error Occurred ', error);
        return Promise.reject(error.message || error);
    }
}