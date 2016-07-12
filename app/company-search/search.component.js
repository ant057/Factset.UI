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
var SearchComponent = (function () {
    function SearchComponent(companySearchProvider) {
        this.companySearchProvider = companySearchProvider;
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.bindTemplate();
    };
    SearchComponent.prototype.bindTemplate = function () {
        this.getIndustries();
    };
    SearchComponent.prototype.getIndustries = function () {
        var _this = this;
        this.companySearchProvider.getIndustries()
            .then(function (response) { return _this.industries = response; })
            .catch(function (error) { return _this.logError(error); });
    };
    SearchComponent.prototype.logError = function (error) {
        console.error('error inside form bind OnInit ' + error);
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/company-search/search.component.html'
        }), 
        __metadata('design:paramtypes', [company_search_service_1.CompanySearchService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map