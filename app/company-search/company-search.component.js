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
//services
var company_search_service_1 = require('./shared/company-search.service');
var CompanySearchComponent = (function () {
    function CompanySearchComponent(companySearchProvider) {
        this.companySearchProvider = companySearchProvider;
        //something
    }
    CompanySearchComponent.prototype.ngOnInit = function () {
        this.bindTemplate();
    };
    CompanySearchComponent.prototype.bindTemplate = function () {
        // get vm for this and child components
        //this.companySearchProvider.getCompaniesAll();
    };
    CompanySearchComponent = __decorate([
        core_1.Component({
            selector: 'company-search',
            templateUrl: 'app/company-search/company-search.component.html'
        }), 
        __metadata('design:paramtypes', [company_search_service_1.CompanySearchService])
    ], CompanySearchComponent);
    return CompanySearchComponent;
}());
exports.CompanySearchComponent = CompanySearchComponent;
//# sourceMappingURL=company-search.component.js.map