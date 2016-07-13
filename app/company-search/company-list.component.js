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
var core_1 = require('@angular/core');
var company_search_service_1 = require('./shared/company-search.service');
var CompanyListComponent = (function () {
    function CompanyListComponent(companySearchProvider) {
        this.companySearchProvider = companySearchProvider;
        this.loading = false;
        //
    }
    CompanyListComponent.prototype.ngOnInit = function () {
        this.bindTemplate();
    };
    CompanyListComponent.prototype.bindTemplate = function () {
        this.loading = true;
        //get vm data back from service
        this.getCompanies();
    };
    CompanyListComponent.prototype.getCompanies = function () {
        var _this = this;
        this.companySearchProvider.getCompanies()
            .then(function (response) { return _this.successHandler(response); })
            .catch(function (error) { return _this.logError(error); });
    };
    CompanyListComponent.prototype.successHandler = function (response) {
        this.companies = response;
        this.loading = false;
    };
    CompanyListComponent.prototype.logError = function (error) {
        console.error('error inside form bind OnInit ' + error);
    };
    CompanyListComponent.prototype.anAlert = function () {
        window.alert('i wouldnt do that if i were you.."');
    };
    CompanyListComponent = __decorate([
        core_1.Component({
            selector: 'company-list',
            templateUrl: 'app/company-search/company-list.component.html'
        }), 
        __metadata('design:paramtypes', [company_search_service_1.CompanySearchService])
    ], CompanyListComponent);
    return CompanyListComponent;
}());
exports.CompanyListComponent = CompanyListComponent;
//# sourceMappingURL=company-list.component.js.map