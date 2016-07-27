//angular
import {Component, OnInit}       from '@angular/core';

//components

//services
import { CompanyDetailService } from './shared/company-detail.service';
//models
import { CompanyDetail } from './shared/company-detail.models';
import { BalanceModel, FinancialDetail, Financial } from '../financial/shared/financial.models.ts';

@Component({
    selector: 'company-detail',
    templateUrl: 'app/company/company-detail.component.html'
})
export class CompanyDetailComponent {

}