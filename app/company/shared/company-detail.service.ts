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

    getCompanyDetail(permSecurityId: string): Promise<CompanyDetail> {
        //return company list data if we have
        if (this._companyDetail) {
            //do stuff
            return Promise.resolve(this._companyDetail);
        } else { //else, get from server
            return this.http.get(this.apiUrl + 'GetCompany/' + permSecurityId)
                .toPromise()
                .then(response => {
                    this._companyDetail = response.json();
                    //other?
                    return this._companyDetail;
                })
                .catch(this.handleError);
        }
    }

    getCompanyStatements(period: string): Promise<FinancialDetail[]> {
        if (this._companyDetail) {
            switch (period) {
                case "Annual":
                    console.warn('returning annual stmt promise');
                    return Promise.resolve(this._companyDetail.financialStatements.annualFinancialStatements);
                //case "Quarterly":
                //    this.activeStatements = this.financials.quarterlyFinancialStatements;
                //case "LTM":
                //    this.activeStatements = this.financials.LTMFinancialStatements;
                //case "Semi-Annual":
                //    this.activeStatements = this.financials.semiAnnualFinancialStatements;
                default:
                    console.warn('returning default annual stmt promise');
                    return Promise.resolve(this._companyDetail.financialStatements.annualFinancialStatements);
            }
        }
    }

    private handleError(error: any) {
        console.error('An Error Occurred ', error);
        return Promise.reject(error.message || error);
    }
}