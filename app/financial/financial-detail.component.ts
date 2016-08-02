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
    //activeStatementsObs: Observable<FinancialDetail[]>;
    //periodSubject = new Subject<string>();

    L0: boolean = false;
    L1: boolean = false;
    L2: boolean = false;
    L3: boolean = false;

    constructor() {
        
    }

    ngOnInit() {
        //this.activeStatements = this.financials.annualFinancialStatements;

        //this.activeStatementsObs.subscribe(
        //    data => 
        //)

        //this.activeStatementsObs = this.periodSubject
        //    .asObservable()           // cast as Observable
        //    .debounceTime(300)        // wait for 300ms pause in events
        //    .distinctUntilChanged()   // ignore if next search term is same as previous
        //    .switchMap(term => term   // switch to new observable each time
        //        // return the http search observable
        //        ? this.returnObs()
        //        // or the observable of empty heroes if no search term
        //        : Observable.of<FinancialDetail[]>([]))
        //    .catch(error => {
        //        // Todo: real error handling
        //        console.log(error);
        //    });
    }

    //returnObs(): Observable<FinancialDetail[]> {
    //    return this.activeStatements = Observable.create(this.financials.annualFinancialStatements);

    //    switch (period) {

    //    }
    //    //    case "Annual":
    //    //        this.activeStatements = null;
    //    //        this.activeStatements = this.financials.annualFinancialStatements;
    //}

}