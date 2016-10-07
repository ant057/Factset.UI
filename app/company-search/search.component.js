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
//models
var company_search_models_1 = require('./shared/company-search.models');
var SearchComponent = (function () {
    function SearchComponent(companySearchProvider) {
        this.companySearchProvider = companySearchProvider;
        this.industryItems = [];
        this.industrySelectedItems = [];
        this.countryItems = [];
        this.countrySelectedItems = [];
        this.sicItems = [];
        this.sicSelectedItems = [];
        this.entityTypeItems = [];
        this.entitySelectedItems = [];
        this.sectorItems = [];
        this.sectorSelectedItems = [];
        this.accordionOpen = true;
        this.selected = '';
        this.companyListArray = [];
        this.page = 1;
        this.pageSize = 25;
        this.loading = false;
        this.companySearch = new company_search_models_1.CompanySearch;
        this.searchParams = new company_search_models_1.SearchParams;
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.bindTemplate();
        this.bindSearchParams();
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
        //this.industrySelectedItems.push({
        //    id: 'Airlines',
        //    text: 'Airlines'
        //});
    };
    SearchComponent.prototype.logError = function (error) {
        console.error('error inside search component bind OnInit ' + error);
    };
    SearchComponent.prototype.bindSearchParams = function () {
        var _this = this;
        this.searchParams = this.companySearchProvider.getSearchParams();
        if (this.searchParams.industries) {
            this.searchParams.industries.forEach(function (f) { return _this.industrySelectedItems.push(f.industryDescription); });
        }
        if (this.searchParams.countries) {
            this.searchParams.countries.forEach(function (f) { return _this.countrySelectedItems.push(f.countryDescription); });
        }
        if (this.searchParams.sectors) {
            this.searchParams.sectors.forEach(function (f) { return _this.sectorSelectedItems.push(f.sectorDescription); });
        }
        if (this.searchParams.sicCodes) {
            this.searchParams.sicCodes.forEach(function (f) { return _this.sicSelectedItems.push(f.sicCode); });
        }
        if (this.searchParams.entityTypes) {
            this.searchParams.entityTypes.forEach(function (f) { return _this.entitySelectedItems.push(f.entityTypeDescription); });
        }
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
        //console.log('Selected value: ', e.item);
    };
    SearchComponent.prototype.getFilteredCompanies = function () {
        var _this = this;
        this.loading = true;
        this.companySearchProvider.getFilteredCompanies(this.page, this.pageSize)
            .then(function (response) { return _this.getCompanyPageHandler(response); })
            .catch(function (error) { return _this.logError(error); });
        this.page = null;
    };
    SearchComponent.prototype.getCompanyPageHandler = function (response) {
        var _this = this;
        this.companies = response.data;
        this.companies.forEach(function (p) { return p.imgUrl = _this.findPicture(p.sectorCode); });
        this.total = response.count;
        this.page = 1;
        this.loading = false;
    };
    SearchComponent.prototype.findPicture = function (sector) {
        switch (sector) {
            case '1100':
                return './app/assets/Coal.png';
            case '1200':
                return './app/assets/Deployment.png';
            case '1300':
                return './app/assets/Processor.png';
            case '1400':
                return './app/assets/Deployment.png';
            case '2100':
                return './app/assets/Electro Devices.png';
            case '2200':
                return './app/assets/Automatic.png';
            case '2300':
                return './app/assets/Electrical Sensor.png';
            case '2400':
                return './app/assets/Deployment.png';
            case '3100':
                return './app/assets/Whisky Still.png';
            case '3200':
                return './app/assets/Work.png';
            case '3250':
                return './app/assets/Deployment.png';
            case '3300':
                return './app/assets/Gyroscope.png';
            case '3350':
                return './app/assets/Electrical Sensor.png';
            case '3400':
                return './app/assets/Deployment.png';
            case '3500':
                return './app/assets/Industrial Scales.png';
            case '4600':
                return './app/assets/Fork Lift.png';
            case '4700':
                return './app/assets/Worker Male.png';
            case '4800':
                return './app/assets/Crowdfunding.png';
            case '4900':
                return './app/assets/Radio Tower.png';
            case '6000':
                return './app/assets/Processor.png';
            case '7000':
                return './app/assets/Warning Shield.png';
            case '9999':
                return './app/assets/Deployment.png';
            default:
                return './app/assets/Deployment.png';
        }
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