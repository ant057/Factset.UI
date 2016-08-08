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
var financial_detail_component_1 = require('../financial/financial-detail.component');
//services
var company_detail_service_1 = require('./shared/company-detail.service');
var CompanyDetailComponent = (function () {
    function CompanyDetailComponent(companyProvider, route, router) {
        this.companyProvider = companyProvider;
        this.route = route;
        this.router = router;
        this.loading = false;
        this.stmtloading = false;
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
        console.warn(response);
        if (response.length > 0) {
            for (var i = 0; i < response.length; i++) {
                response[i].financialStatements = response[i].financialStatements.filter(function (f) { return f.reportCode.substr(0, 2) === _this.type; });
            }
            this.activeFinancials = response;
        }
        else {
        }
        this.stmtloading = false;
    };
    CompanyDetailComponent.prototype.logError = function (error) {
        console.error('error inside company detail component bind: OnInit ' + error);
    };
    CompanyDetailComponent = __decorate([
        core_1.Component({
            selector: 'company-detail',
            templateUrl: 'app/company/company-detail.component.html',
            directives: [financial_detail_component_1.FinancialDetailComponent]
        }), 
        __metadata('design:paramtypes', [company_detail_service_1.CompanyDetailService, router_1.ActivatedRoute, router_1.Router])
    ], CompanyDetailComponent);
    return CompanyDetailComponent;
}());
exports.CompanyDetailComponent = CompanyDetailComponent;
//# sourceMappingURL=company-detail.component.js.map