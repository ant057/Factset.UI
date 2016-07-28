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
//components
var financial_detail_component_1 = require('../financial/financial-detail.component');
//services
var company_detail_service_1 = require('./shared/company-detail.service');
var CompanyDetailComponent = (function () {
    function CompanyDetailComponent(companyProvider) {
        this.companyProvider = companyProvider;
        this.loading = false;
    }
    CompanyDetailComponent.prototype.ngOnInit = function () {
        this.bindTemplate();
    };
    CompanyDetailComponent.prototype.bindTemplate = function () {
        this.loading = true;
        // get vm for this and child components
        this.getCompanyDetail("D0MJZ3-S-US");
    };
    CompanyDetailComponent.prototype.getCompanyDetail = function (permSecurityId) {
        var _this = this;
        this.companyProvider.getCompanyDetail(permSecurityId)
            .then(function (response) { return _this.successHandler(response); })
            .catch(function (error) { return _this.logError(error); });
    };
    CompanyDetailComponent.prototype.successHandler = function (response) {
        this.companyDetail = response;
        this.loading = false;
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
        __metadata('design:paramtypes', [company_detail_service_1.CompanyDetailService])
    ], CompanyDetailComponent);
    return CompanyDetailComponent;
}());
exports.CompanyDetailComponent = CompanyDetailComponent;
//# sourceMappingURL=company-detail.component.js.map