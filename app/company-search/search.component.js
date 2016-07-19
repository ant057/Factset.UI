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
var accordion_1 = require('ng2-bootstrap/components/accordion');
var typeahead_1 = require('ng2-bootstrap/components/typeahead');
var forms_1 = require('@angular/forms');
//models
var company_search_models_1 = require('./shared/company-search.models');
var SearchComponent = (function () {
    function SearchComponent(companySearchProvider) {
        this.companySearchProvider = companySearchProvider;
        this.industryItems = [];
        this.countryItems = [];
        this.sicItems = [];
        this.entityTypeItems = [];
        this.sectorItems = [];
        this.accordionOpen = true;
        this.selected = '';
        this.companyListArray = [];
        this.companySearch = new company_search_models_1.CompanySearch;
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.bindTemplate();
    };
    SearchComponent.prototype.alert = function () {
        window.alert('hi');
    };
    SearchComponent.prototype.bindTemplate = function () {
        this.getCompanySearchModel();
        this.getCompanies();
    };
    SearchComponent.prototype.getCompanySearchModel = function () {
        var _this = this;
        this.companySearchProvider.getCompanySearchModel()
            .then(function (response) { return _this.successHandler(response); })
            .catch(function (error) { return _this.logError(error); });
    };
    SearchComponent.prototype.getCompanies = function () {
        var _this = this;
        this.companySearchProvider.getCompaniesAll()
            .then(function (response) {
            for (var i = 0; i < response.length; i++) {
                _this.companyListArray.push(response[i].companyName);
            }
        })
            .catch(function (error) { return _this.logError(error); });
    };
    SearchComponent.prototype.successHandler = function (response) {
        this.companySearch.countries = response.countries;
        this.companySearch.entityTypes = response.entityTypes;
        this.companySearch.industries = response.industries;
        this.companySearch.sectors = response.sectors;
        this.companySearch.sics = response.siCs;
        for (var i = 0; i < this.companySearch.industries.length; i++) {
            this.industryItems.push(this.companySearch.industries[i].industryDescription);
        }
        for (var i = 0; i < this.companySearch.sics.length; i++) {
            this.sicItems.push(this.companySearch.sics[i].sicCode + ' ' + this.companySearch.sics[i].sicDescription.substr(0, 20) + '..');
        }
        for (var i = 0; i < this.companySearch.entityTypes.length; i++) {
            this.entityTypeItems.push(this.companySearch.entityTypes[i].entityTypeDescription);
        }
        for (var i = 0; i < this.companySearch.countries.length; i++) {
            this.countryItems.push(this.companySearch.countries[i].countryDescription);
        }
        for (var i = 0; i < this.companySearch.sectors.length; i++) {
            this.sectorItems.push(this.companySearch.sectors[i].sectorDescription);
        }
    };
    SearchComponent.prototype.logError = function (error) {
        console.error('error inside form bind OnInit ' + error);
    };
    SearchComponent.prototype.selectedIndustry = function (value) {
        console.log('Selected value is: ', value);
    };
    SearchComponent.prototype.removedIndustry = function (value) {
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
    SearchComponent.prototype.typeaheadOnSelect = function (e) {
        console.log('Selected value: ', e.item);
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/company-search/search.component.html',
            directives: [auto_complete_component_1.AutoCompleteComponent, ng2_select_1.SELECT_DIRECTIVES,
                accordion_1.ACCORDION_DIRECTIVES, typeahead_1.TYPEAHEAD_DIRECTIVES, forms_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [company_search_service_1.CompanySearchService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map