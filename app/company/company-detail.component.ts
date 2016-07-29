//angular
import { Component, OnInit}        from '@angular/core';

//components
import { FinancialDetailComponent } from '../financial/financial-detail.component';
//services
import { CompanyDetailService } from './shared/company-detail.service';
//models
import { CompanyDetail } from './shared/company-detail.models';
import { BalanceModel, FinancialDetail, Financial } from '../financial/shared/financial.models';

@Component({
    selector: 'company-detail',
    templateUrl: 'app/company/company-detail.component.html',
    directives: [FinancialDetailComponent]
})
export class CompanyDetailComponent implements OnInit{

    companyDetail: CompanyDetail;
    activeFinancials: FinancialDetail[]
    loading: boolean = false;
    period: string;
    type: string;

    constructor(private companyProvider: CompanyDetailService) {
        
    }

    ngOnInit() {
        this.bindTemplate();
    }

    bindTemplate() {
        this.loading = true;
        this.period = "Annual";
        this.type = "BS";
        // get vm for this and child components
        this.getCompanyDetail("D0MJZ3-S-US");
    }

    getCompanyDetail(permSecurityId: string) {
        this.companyProvider.getCompanyDetail(permSecurityId)
            .then(response => this.successHandler(response))
            .catch(error => this.logError(error));
    }

    successHandler(response: any) {
        this.companyDetail = response;
        this.activeFinancials = this.companyDetail.financialStatements.annualFinancialStatements;
        this.loading = false;
    }

    getStatements(period: string, type: string) {
        this.period = period;      
        this.type = type;
        this.companyProvider.getStatements(period, type)
            .then(response => this.getStatementsSuccess(response))
            .catch(error => this.logError(error));
    }

    getStatementsSuccess(response: any) {
        this.activeFinancials = response;
        console.warn(response);
        console.warn(this.activeFinancials);
        for (var i = 0; i < this.activeFinancials.length; i++) {
            for (var p = 0; p < this.activeFinancials[i].financialStatements.length; p++) {
                //this.activeFinancials[i].financialStatements[p] =
                //    this.activeFinancials[i].financialStatements[p].filter(p => p.reportCode.substr(0, 2) === this.type);
            }
        }
    }

    logError(error: any) {
        console.error('error inside company detail component bind: OnInit ' + error);
    }
}