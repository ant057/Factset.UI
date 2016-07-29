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
        this.type = "Balance Sheet";
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

    getPeriod(period: string) {
        this.period = period;      
        this.companyProvider.getCompanyStatements(period)
            .then(response => this.activeFinancials = response)
            .catch(error => this.logError(error));
    }

    logError(error: any) {
        console.error('error inside company detail component bind: OnInit ' + error);
    }
}