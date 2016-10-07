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
var router_1 = require('@angular/router');
//components
//import {MdSidenavLayout, MdSidenav} from '@angular2-material/sidenav';
//services
var company_detail_service_1 = require('./shared/company-detail.service');
var CompanyDetailComponent = (function () {
    function CompanyDetailComponent(companyProvider, route, router) {
        this.companyProvider = companyProvider;
        this.route = route;
        this.router = router;
        this.loading = false;
        this.stmtloading = false;
        this.noFinancials = false;
        this.addAccountSuccess = false;
        this.disableAddAcct = false;
        this.addingAccount = false;
        this.barChartData = [];
        this.barChartLabels = [];
        this.lineChartData = [];
        this.lineChartLabels = [];
        this.bar2ChartData = [];
        this.bar2ChartLabels = [];
    }
    CompanyDetailComponent.prototype.ngOnInit = function () {
        this.bindTemplate();
    };
    CompanyDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    CompanyDetailComponent.prototype.bindTemplate = function () {
        var _this = this;
        this.loading = true;
        this.period = "Annual";
        this.type = "BS";
        this.sub = this.route.params.subscribe(function (params) {
            _this.permSecId = params['permanentSecurityId'];
            _this.getCompanyDetail(_this.permSecId);
        });
    };
    CompanyDetailComponent.prototype.getCompanyDetail = function (permSecurityId) {
        var _this = this;
        this.companyProvider.getCompanyDetail(permSecurityId)
            .then(function (response) { return _this.successHandler(response); })
            .catch(function (error) { return _this.logError(error); });
    };
    CompanyDetailComponent.prototype.successHandler = function (response) {
        this.companyDetail = response;
        this.getStatements(this.period, this.type);
        this.loading = false;
    };
    CompanyDetailComponent.prototype.addAccount = function (permSecId) {
        var _this = this;
        if (window.confirm('Create new account?')) {
            this.disableAddAcct = true;
            this.addingAccount = true;
            this.companyProvider.addAccount(permSecId)
                .then(function (response) { return _this.handleAddAccountSuccess(response); })
                .catch(function (error) { return _this.logError(error); });
        }
    };
    CompanyDetailComponent.prototype.handleAddAccountSuccess = function (response) {
        if (response) {
            this.companyDetail.anchorAccount = response;
            this.addAccountSuccess = true;
            this.addingAccount = false;
        }
    };
    CompanyDetailComponent.prototype.getStatements = function (period, type) {
        var _this = this;
        this.stmtloading = true;
        this.period = period;
        this.type = type;
        this.companyProvider.getStatements(period, type, this.permSecId)
            .then(function (response) { return _this.getStatementsSuccess(response); })
            .catch(function (error) { return _this.logError(error); });
    };
    CompanyDetailComponent.prototype.getStatementsSuccess = function (response) {
        var _this = this;
        this.stmtloading = false;
        var incomeChartData = new ChartData;
        var revenueChartData = new ChartData;
        var date = [];
        incomeChartData.label = 'Income';
        revenueChartData.label = 'Revenue';
        incomeChartData.data = [];
        revenueChartData.data = [];
        this.barChartData = [];
        this.barChartLabels = [];
        var ROEChartData = new ChartData;
        ROEChartData.label = 'Return on Equity';
        ROEChartData.data = [];
        this.lineChartData = [];
        this.lineChartLabels = [];
        var FCFChartData = new ChartData;
        FCFChartData.label = 'Free Cash Flow';
        FCFChartData.data = [];
        this.bar2ChartData = [];
        this.bar2ChartLabels = [];
        if (response.length > 0) {
            for (var i_1 = 0; i_1 < response.length; i_1++) {
                date.push(response[i_1].date.toString().substr(0, response[i_1].date.toString().indexOf('T')));
                incomeChartData.data.push(response[i_1].financialStatements[response[i_1].financialStatements.findIndex(function (p) { return p.fieldName == 'ff_net_inc'; })].value);
                revenueChartData.data.push(response[i_1].financialStatements[response[i_1].financialStatements.findIndex(function (p) { return p.fieldName == 'ff_sales'; })].value);
                ROEChartData.data.push((response[i_1].financialStatements[response[i_1].financialStatements.findIndex(function (p) { return p.fieldName == 'ff_net_inc'; })].value / response[i_1].financialStatements[response[i_1].financialStatements.findIndex(function (p) { return p.fieldName == 'ff_shldrs_eq'; })].value) * 100);
                FCFChartData.data.push(response[i_1].financialStatements[response[i_1].financialStatements.findIndex(function (p) { return p.fieldName == 'ff_free_cf'; })].value);
            }
            this.barChartLabels = (date);
            this.lineChartLabels = (date);
            this.bar2ChartLabels = (date);
            for (var i = 0; i < response.length; i++) {
                response[i].financialStatements = response[i].financialStatements.filter(function (f) { return f.reportCode.substr(0, 2) === _this.type; });
            }
            this.activeFinancials = response;
            this.noFinancials = false;
            this.barChartData.push(incomeChartData);
            this.barChartData.push(revenueChartData);
            this.lineChartData.push(ROEChartData);
            this.bar2ChartData.push(FCFChartData);
        }
        else {
            this.noFinancials = true;
            this.activeFinancials = null;
        }
    };
    CompanyDetailComponent.prototype.logError = function (error) {
        console.error('error inside company detail component bind: OnInit ' + error);
    };
    CompanyDetailComponent = __decorate([
        core_1.Component({
            selector: 'company-detail',
            templateUrl: 'app/company/company-detail.component.html'
        }), 
        __metadata('design:paramtypes', [company_detail_service_1.CompanyDetailService, router_1.ActivatedRoute, router_1.Router])
    ], CompanyDetailComponent);
    return CompanyDetailComponent;
}());
exports.CompanyDetailComponent = CompanyDetailComponent;
var ChartData = (function () {
    function ChartData() {
    }
    return ChartData;
}());
//# sourceMappingURL=company-detail.component.js.map