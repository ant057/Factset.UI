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
        this.page = 1;
        this.pageSize = 25;
        this.loading = false;
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
        // this.getCompanies();
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
        console.error('error inside search component bind OnInit ' + error);
    };
    SearchComponent.prototype.selectedIndustry = function (value) {
        var industry = new company_search_models_1.Industry;
        industry.industryCode = value.id;
        industry.industryDescription = value.text;
        this.companySearchProvider.addIndustryParam(industry);
    };
    SearchComponent.prototype.removedIndustry = function (value) {
        var industry = new company_search_models_1.Industry;
        industry.industryCode = value.id;
        industry.industryDescription = value.text;
        this.companySearchProvider.removeIndustryParam(industry);
    };
    SearchComponent.prototype.selectedCountry = function (value) {
        var country = new company_search_models_1.Country;
        country.isoCountry = value.id;
        country.countryDescription = value.text;
        this.companySearchProvider.addCountryParam(country);
    };
    SearchComponent.prototype.removedCountry = function (value) {
        var country = new company_search_models_1.Country;
        country.isoCountry = value.id;
        country.countryDescription = value.text;
        this.companySearchProvider.removeCountryParam(country);
    };
    SearchComponent.prototype.selectedSIC = function (value) {
        var sic = new company_search_models_1.SIC;
        sic.sicCode = value.id;
        sic.sicDescription = value.text;
        this.companySearchProvider.addSICParam(sic);
    };
    SearchComponent.prototype.removedSIC = function (value) {
        var sic = new company_search_models_1.SIC;
        sic.sicCode = value.id;
        sic.sicDescription = value.text;
        this.companySearchProvider.removeSICParam(sic);
    };
    SearchComponent.prototype.selectedEntityType = function (value) {
        var entitytype = new company_search_models_1.EntityType;
        entitytype.entityTypeCode = value.id;
        entitytype.entityTypeDescription = value.text;
        this.companySearchProvider.addEntityTypeParam(entitytype);
    };
    SearchComponent.prototype.removedEntityType = function (value) {
        var entitytype = new company_search_models_1.EntityType;
        entitytype.entityTypeCode = value.id;
        entitytype.entityTypeDescription = value.text;
        this.companySearchProvider.removeEntityTypeParam(entitytype);
    };
    SearchComponent.prototype.selectedSector = function (value) {
        var sector = new company_search_models_1.Sector;
        sector.sectorCode = value.id;
        sector.sectorDescription = value.text;
        this.companySearchProvider.addSectorParam(sector);
    };
    SearchComponent.prototype.removedSector = function (value) {
        var sector = new company_search_models_1.Sector;
        sector.sectorCode = value.id;
        sector.sectorDescription = value.text;
        this.companySearchProvider.removeSectorParam(sector);
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
    SearchComponent.prototype.getFilteredCompanies = function () {
        var _this = this;
        this.loading = true;
        this.companySearchProvider.getFilteredCompanies(this.page, this.pageSize)
            .then(function (response) { return _this.getCompanyPageHandler(response); })
            .catch(function (error) { return _this.logError(error); });
    };
    SearchComponent.prototype.getCompanyPageHandler = function (response) {
        this.loading = false;
        this.companies = response.data;
        this.total = response.count;
        this.page = 1;
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