"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//angular
var core_1 = require('@angular/core');
// Observable class extensions
require('rxjs/add/observable/of');
// Observable operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/do');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
var financial_models_1 = require('../financial/shared/financial.models');
var FinancialDetailComponent = (function () {
    //activeStatementsObs: Observable<FinancialDetail[]>;
    //periodSubject = new Subject<string>();
    function FinancialDetailComponent() {
    }
    FinancialDetailComponent.prototype.ngOnInit = function () {
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', financial_models_1.Financial)
    ], FinancialDetailComponent.prototype, "financials", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FinancialDetailComponent.prototype, "activeStatements", void 0);
    FinancialDetailComponent = __decorate([
        core_1.Component({
            selector: 'financial-detail',
            templateUrl: 'app/financial/financial-detail.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], FinancialDetailComponent);
    return FinancialDetailComponent;
}());
exports.FinancialDetailComponent = FinancialDetailComponent;
//# sourceMappingURL=financial-detail.component.js.map