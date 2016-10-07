//angular
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

//models
import { CompanyDetail, AnchorAccount } from './company-detail.models';
import { BalanceModel, FinancialDetail, Financial } from '../../financial/shared/financial.models';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanyDetailService {
    private mockApiUrl: string = 'app/company-search/shared/industries.json';
    private apiUrlBase: string = 'http://ausp-sur-sql01:54665/api/';
    private apiUrl: string = this.apiUrlBase + 'Company/';

    private _companyDetail: CompanyDetail;
    private _financials: Financial;

    constructor(private http: Http) {
 
    }

    addAccount(permanentSecurityId: string): Promise<AnchorAccount> {
        let body: string; {
            body = JSON.stringify(permanentSecurityId)
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiUrl + 'AddAccount/' + permanentSecurityId, body, options)
            .toPromise()
            .then(response => {
                if (this._companyDetail) {
                    this._companyDetail.anchorAccount = response.json();
                    return this._companyDetail.anchorAccount;
                }
            })
            .catch(this.handleError);
    }

    getCompanyDetail(permSecurityId: string): Promise<CompanyDetail> {
            return this.http.get(this.apiUrl + 'GetCompany/' + permSecurityId)
                .toPromise()
                .then(response => {
                    this._companyDetail = response.json();
                    return this._companyDetail;
                })
                .catch(this.handleError);
    }

    getFinancials(permSecurityId: string): Promise<Financial> {
            return this.http.get(this.apiUrl + 'GetCompanyFinancials/' + permSecurityId)
                .toPromise()
                .then(response => {
                    this._financials = response.json();
                    //other?
                    return this._financials;
                })
                .catch(this.handleError);
    }

    getStatements(period: string, type: string, permSecurityId: string): Promise<FinancialDetail[]> {

        return this.http.get(this.apiUrl + 'GetCompanyFinancials/' + permSecurityId)
            .toPromise()
            .then(response => {
                this._companyDetail.financialStatements = response.json();
                //other?
                switch (period) {
                    case "Annual":
                        return this._companyDetail.financialStatements.annualFinancialStatements;
                    case "Quarterly":
                        return this._companyDetail.financialStatements.quarterlyFinancialStatements;
                    case "LTM":
                        return this._companyDetail.financialStatements.ltmFinancialStatements;
                    case "Semi-Annual":
                        return this._companyDetail.financialStatements.semiAnnualFinancialStatements;
                    default:
                        return this._companyDetail.financialStatements.annualFinancialStatements;
                }
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An Error Occurred ', error);
        return Promise.reject(error.message || error);
    }
}