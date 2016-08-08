//angular
import { Component, OnInit}        from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activeFinancials: FinancialDetail[];
    loading: boolean = false;
    stmtloading: boolean = false;
    period: string;
    type: string;
    sub: any;
    permSecId: string;
    noFinancials: boolean = false;

    constructor(private companyProvider: CompanyDetailService,
    private route: ActivatedRoute, private router: Router) {
        
    }

    ngOnInit() {
        this.bindTemplate();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    bindTemplate() { 
        this.loading = true;
        this.period = "Annual";
        this.type = "BS";

        this.sub = this.route.params.subscribe(params => {
            this.permSecId = params['permanentSecurityId'];
            this.getCompanyDetail(this.permSecId);
        });
    }

    getCompanyDetail(permSecurityId: string) {
        this.companyProvider.getCompanyDetail(permSecurityId)
            .then(response => this.successHandler(response))
            .catch(error => this.logError(error));
    }

    successHandler(response: any) {
        this.companyDetail = response;
        this.getStatements(this.period, this.type);
        this.loading = false;
    }

    getStatements(period: string, type: string) {
        this.stmtloading = true;
        this.period = period;      
        this.type = type;
        this.companyProvider.getStatements(period, type, this.permSecId)
            .then(response => this.getStatementsSuccess(response))
            .catch(error => this.logError(error));       
    } 

    getStatementsSuccess(response: FinancialDetail[]) {
        console.warn(response);
        if (response.length > 0) { //financials 
            for (var i = 0; i < response.length; i++) {
                response[i].financialStatements = response[i].financialStatements.filter(f => f.reportCode.substr(0, 2) === this.type);
            }
            this.activeFinancials = response;
            this.noFinancials = false;
        }
        else { //no financials
            this.noFinancials = true;
            this.activeFinancials = null;
        }
       this.stmtloading = false;
    }

    logError(error: any) {
        console.error('error inside company detail component bind: OnInit ' + error);
    }
}