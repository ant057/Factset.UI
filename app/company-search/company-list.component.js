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
var ng2_pagination_1 = require('ng2-pagination');
var router_1 = require('@angular/router');
//services
var company_search_service_1 = require('./shared/company-search.service');
var CompanyListComponent = (function () {
    function CompanyListComponent(companySearchProvider, router) {
        this.companySearchProvider = companySearchProvider;
        this.router = router;
        this.loading = false;
        this.pageSize = 25;
        this.toggled = false;
        this.toggleValue = '<';
        //
    }
    CompanyListComponent.prototype.ngOnInit = function () {
        this.bindTemplate();
    };
    CompanyListComponent.prototype.bindTemplate = function () {
        this.loading = true;
        //get vm data back from service
        this.getCompanyPage(1);
    };
    CompanyListComponent.prototype.getCompanyPage = function (page) {
        var _this = this;
        this.companySearchProvider.getCompanies(page, this.pageSize)
            .then(function (response) { return _this.successHandler(response); })
            .catch(function (error) { return _this.logError(error); });
        this.page = page;
    };
    CompanyListComponent.prototype.successHandler = function (response) {
        this.pagedData = response;
        this.companies = response.data;
        this.total = response.count;
        this.loading = false;
    };
    CompanyListComponent.prototype.logError = function (error) {
        console.error('error inside form bind OnInit ' + error);
    };
    CompanyListComponent.prototype.selectCompany = function (permSecId) {
        this.router.navigate(['/company', permSecId]);
    };
    CompanyListComponent.prototype.toggle = function () {
        if (this.toggled) {
            this.toggled = false;
            this.toggleValue = '<';
        }
        else {
            this.toggled = true;
            this.toggleValue = '>';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CompanyListComponent.prototype, "companies", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CompanyListComponent.prototype, "loading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CompanyListComponent.prototype, "page", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CompanyListComponent.prototype, "pageSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CompanyListComponent.prototype, "total", void 0);
    CompanyListComponent = __decorate([
        core_1.Component({
            selector: 'company-list',
            templateUrl: 'app/company-search/company-list.component.html',
            providers: [ng2_pagination_1.PaginationService],
            directives: [ng2_pagination_1.PaginationControlsCmp],
            pipes: [ng2_pagination_1.PaginatePipe]
        }), 
        __metadata('design:paramtypes', [company_search_service_1.CompanySearchService, router_1.Router])
    ], CompanyListComponent);
    return CompanyListComponent;
}());
exports.CompanyListComponent = CompanyListComponent;
//# sourceMappingURL=company-list.component.js.map