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
    loading: boolean = false;

    constructor(private companyProvider: CompanyDetailService) {
        
    }

    ngOnInit() {
        this.bindTemplate();
    }

    bindTemplate() {
        this.loading = true;
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
        this.loading = false;
    }

    logError(error: any) {
        console.error('error inside company detail component bind: OnInit ' + error);
    }
}