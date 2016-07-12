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
var search_component_1 = require('./search.component');
var company_list_component_1 = require('./company-list.component');
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
        //get service
    };
    CompanySearchComponent = __decorate([
        core_1.Component({
            selector: 'company-search',
            templateUrl: 'app/company-search/company-search.component.html',
            directives: [search_component_1.SearchComponent, company_list_component_1.CompanyListComponent],
            providers: [company_search_service_1.CompanySearchService]
        }), 
        __metadata('design:paramtypes', [company_search_service_1.CompanySearchService])
    ], CompanySearchComponent);
    return CompanySearchComponent;
}());
exports.CompanySearchComponent = CompanySearchComponent;
//# sourceMappingURL=company-search.component.js.map