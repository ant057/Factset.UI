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
//components
var auto_complete_component_1 = require('./shared/auto-complete.component');
var ng2_select_1 = require('ng2-select');
//models
var company_search_models_1 = require('./shared/company-search.models');
var SearchComponent = (function () {
    function SearchComponent(companySearchProvider) {
        this.companySearchProvider = companySearchProvider;
        this.items = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
            'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
            'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Dusseldorf',
            'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
            'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'todz', 'London', 'Krakow', 'Madrid',
            'Mlaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
            'Paris', 'Poznan', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
            'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
            'Vilnius', 'Warsaw', 'Wroclaw', 'Zagreb', 'Zaragoza'];
        this.companySearch = new company_search_models_1.CompanySearch;
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.bindTemplate();
    };
    SearchComponent.prototype.bindTemplate = function () {
        this.getCompanySearchModel();
    };
    SearchComponent.prototype.getCompanySearchModel = function () {
        var _this = this;
        this.companySearchProvider.getCompanySearchModel()
            .then(function (response) { return _this.successHandler(response); })
            .catch(function (error) { return _this.logError(error); });
    };
    SearchComponent.prototype.successHandler = function (response) {
        this.companySearch.countries = response.countries;
        this.companySearch.entityTypes = response.entityTypes;
        this.companySearch.industries = response.industries;
        this.companySearch.sectors = response.sectors;
        this.companySearch.sics = response.siCs;
        console.warn(this.companySearch);
    };
    SearchComponent.prototype.logError = function (error) {
        console.error('error inside form bind OnInit ' + error);
    };
    SearchComponent.prototype.selected = function (value) {
        console.log('Selected value is: ', value);
    };
    SearchComponent.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
    };
    SearchComponent.prototype.refreshValue = function (value) {
        this.value = value;
    };
    SearchComponent.prototype.itemsToString = function (value) {
        if (value === void 0) { value = []; }
        return value
            .map(function (item) {
            return item.text;
        }).join(',');
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/company-search/search.component.html',
            directives: [auto_complete_component_1.AutoCompleteComponent, ng2_select_1.SELECT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [company_search_service_1.CompanySearchService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map