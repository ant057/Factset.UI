//angular
import {Component, OnInit}        from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
//components
//import {MdSidenavLayout, MdSidenav} from '@angular2-material/sidenav';
//services
import {CompanyDetailService} from './shared/company-detail.service';
//models
import {CompanyDetail} from './shared/company-detail.models';
import {BalanceModel, FinancialDetail, Financial} from '../financial/shared/financial.models';

@Component({
    selector: 'company-detail',
    templateUrl: 'app/company/company-detail.component.html'
//    directives: [FinancialDetailComponent, MdSidenav, MdSidenavLayout]
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
    addAccountSuccess: boolean = false;
    disableAddAcct: boolean = false;
    addingAccount: boolean = false;

    public barChartData: ChartData[] = [];
    public barChartLabels: any[] = [];

    public lineChartData: ChartData[] = [];
    public lineChartLabels: any[] = [];

    public bar2ChartData: ChartData[] = [];
    public bar2ChartLabels: any[] = [];

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

    addAccount(permSecId: string) {
        if (window.confirm('Create new account?')) {
            this.disableAddAcct = true;
            this.addingAccount = true;
            this.companyProvider.addAccount(permSecId)
                .then(response => this.handleAddAccountSuccess(response))
                .catch(error => this.logError(error));
        }
    }

    handleAddAccountSuccess(response: any) {
        if (response) {
            this.companyDetail.anchorAccount = response;
            this.addAccountSuccess = true;
            this.addingAccount = false;
        }
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
        this.stmtloading = false;
        let incomeChartData: ChartData = new ChartData;
        let revenueChartData: ChartData = new ChartData;
        let date: string[] = [];
        incomeChartData.label = 'Income';
        revenueChartData.label = 'Revenue'; 

        incomeChartData.data = [];
        revenueChartData.data = [];

        this.barChartData = [];
        this.barChartLabels = [];

        let ROEChartData: ChartData = new ChartData;
        ROEChartData.label = 'Return on Equity';
        ROEChartData.data = [];

        this.lineChartData = [];
        this.lineChartLabels = [];

        let FCFChartData: ChartData = new ChartData;
        FCFChartData.label = 'Free Cash Flow';
        FCFChartData.data = [];

        this.bar2ChartData = [];
        this.bar2ChartLabels = [];

        if (response.length > 0) { //financials 
            for (let i = 0; i < response.length; i++) {
                date.push(response[i].date.toString().substr(0, response[i].date.toString().indexOf('T')));
                incomeChartData.data.push(response[i].financialStatements[response[i].financialStatements.findIndex(p => p.fieldName == 'ff_net_inc')].value);
                revenueChartData.data.push(response[i].financialStatements[response[i].financialStatements.findIndex(p => p.fieldName == 'ff_sales')].value);
                ROEChartData.data.push((response[i].financialStatements[response[i].financialStatements.findIndex(p => p.fieldName == 'ff_net_inc')].value / response[i].financialStatements[response[i].financialStatements.findIndex(p => p.fieldName == 'ff_shldrs_eq')].value) * 100);
                FCFChartData.data.push(response[i].financialStatements[response[i].financialStatements.findIndex(p => p.fieldName == 'ff_free_cf')].value);
            }
            this.barChartLabels = (date);
            this.lineChartLabels = (date);
            this.bar2ChartLabels = (date);
            for (var i = 0; i < response.length; i++) {
                response[i].financialStatements = response[i].financialStatements.filter(f => f.reportCode.substr(0, 2) === this.type);
            }
            this.activeFinancials = response;
            this.noFinancials = false;
            this.barChartData.push(incomeChartData);
            this.barChartData.push(revenueChartData);
            this.lineChartData.push(ROEChartData);
            this.bar2ChartData.push(FCFChartData);
        }
        else { //no financials
            this.noFinancials = true;
            this.activeFinancials = null;
        }
    }

    logError(error: any) {
        console.error('error inside company detail component bind: OnInit ' + error);
    }
}

class ChartData {
    data: number[]
    label: string
}