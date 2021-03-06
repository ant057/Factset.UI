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
    function FinancialDetailComponent() {
        this.barChartLabels = [];
        //earnings chart
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: false
        };
        this.barChartType = 'bar';
        this.barChartLegend = true;
        //ROE chart
        this.lineChartOptions = {
            animation: false,
            responsive: false
        };
        this.lineChartType = 'line';
        this.lineChartLegend = true;
        //CR chart
        this.bar2ChartOptions = {
            scaleShowVerticalLines: false,
            responsive: false
        };
        this.bar2ChartType = 'bar';
        this.bar2ChartLegend = true;
    }
    FinancialDetailComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', financial_models_1.Financial)
    ], FinancialDetailComponent.prototype, "financials", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FinancialDetailComponent.prototype, "activeStatements", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FinancialDetailComponent.prototype, "barChartData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FinancialDetailComponent.prototype, "barChartLabels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FinancialDetailComponent.prototype, "lineChartData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FinancialDetailComponent.prototype, "lineChartLabels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FinancialDetailComponent.prototype, "bar2ChartData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FinancialDetailComponent.prototype, "bar2ChartLabels", void 0);
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