//angular
import { Component, OnInit, Input }       from '@angular/core';

// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Subject }  from 'rxjs/Subject';
//components

//services
import { CompanyDetailService } from '../company/shared/company-detail.service';

//models
import { CompanyDetail } from '../company/shared/company-detail.models';
import { BalanceModel, FinancialDetail, Financial } from '../financial/shared/financial.models';

@Component({
    selector: 'financial-detail',
    templateUrl: 'app/financial/financial-detail.component.html'
})
export class FinancialDetailComponent {

    @Input() financials: Financial;
    @Input() activeStatements: FinancialDetail[];
    @Input() barChartData: any[];
    @Input() barChartLabels: any[] = [];
    @Input() lineChartData: any[];
    @Input() lineChartLabels: any[];
    @Input() bar2ChartData: any[];
    @Input() bar2ChartLabels: any[];

    //earnings chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: false
    };
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    //ROE chart
    public lineChartOptions: any = {
        animation: false,
        responsive: false
    };
    public lineChartType: string = 'line';
    public lineChartLegend: boolean = true;

    //CR chart
    public bar2ChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: false
    };
    public bar2ChartType: string = 'bar';
    public bar2ChartLegend: boolean = true;

    constructor() {
        
    }

    ngOnInit() {

    }
}