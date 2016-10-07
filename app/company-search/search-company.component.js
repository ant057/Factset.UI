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
//services
var company_search_service_1 = require('./shared/company-search.service');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var SearchCompanyComponent = (function () {
    function SearchCompanyComponent(companySearchProvider, router) {
        this.companySearchProvider = companySearchProvider;
        this.router = router;
        this.searchTerms = new Subject_1.Subject();
    }
    //what is going on here..
    SearchCompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchCompaniesResult = this.searchTerms
            .debounceTime(200) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time
            ? _this.companySearchProvider.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: real error handling
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    // Push a search term into the observable stream. 
    SearchCompanyComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    SearchCompanyComponent.prototype.gotoDetail = function (company) {
        var link = ['/company', company.permanentSecurityID];
        this.router.navigate(link);
    };
    SearchCompanyComponent = __decorate([
        core_1.Component({
            selector: 'search-company',
            templateUrl: 'app/company-search/search-company.component.html'
        }), 
        __metadata('design:paramtypes', [company_search_service_1.CompanySearchService, router_1.Router])
    ], SearchCompanyComponent);
    return SearchCompanyComponent;
}());
exports.SearchCompanyComponent = SearchCompanyComponent;
//# sourceMappingURL=search-company.component.js.map