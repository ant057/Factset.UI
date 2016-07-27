//angular
import {Component, OnInit, Input}       from '@angular/core';

//components

//services
import { CompanyDetailService } from '../company/shared/company-detail.service';
//models
import { CompanyDetail } from '../company/shared/company-detail.models';
import { BalanceModel, FinancialDetail, Financial } from '../financial/shared/financial.models.ts';

@Component({
    selector: 'financial-detail',
    templateUrl: 'app/financial/financial-detail.component.html'
})
export class FinancialDetailComponent {

    @Input() financials: Financial;

    constructor() {

    }
}