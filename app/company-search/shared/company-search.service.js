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
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
//models
var company_search_models_1 = require('./company-search.models');
require('rxjs/add/operator/toPromise');
var CompanySearchService = (function () {
    function CompanySearchService(http) {
        this.http = http;
        this.mockApiUrl = 'app/company-search/shared/industries.json';
        this.apiUrlBase = 'http://ausp-sur-sql01:54665/api/';
        this.apiUrl = this.apiUrlBase + 'CompanySearch/';
        this._pagedCompanyList = new company_search_models_1.PagedCompanyList;
        this._searchParams = new company_search_models_1.SearchParams;
    }
    CompanySearchService.prototype.search = function (term) {
        return this.http.get(this.apiUrl + ("SearchCompanyName/?name=" + term))
            .map(function (r) { return r.json(); });
    };
    CompanySearchService.prototype.getSearchParams = function () {
        if (this._searchParams) {
            return this._searchParams;
        }
    };
    CompanySearchService.prototype.getIndustries = function () {
        return this.http.get(this.mockApiUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CompanySearchService.prototype.addCountryParam = function (country) {
        if (this._searchParams.countries) {
        }
        else {
            this._searchParams.countries = new Array();
        }
        this._searchParams.countries.push(country);
    };
    CompanySearchService.prototype.removeCountryParam = function (country) {
        this._searchParams.countries = this._searchParams.countries.filter(function (i) { return i.countryDescription !== country.countryDescription; });
    };
    CompanySearchService.prototype.addSICParam = function (sic) {
        if (this._searchParams.sicCodes) {
        }
        else {
            this._searchParams.sicCodes = new Array();
        }
        this._searchParams.sicCodes.push(sic);
    };
    CompanySearchService.prototype.removeSICParam = function (sic) {
        this._searchParams.sicCodes = this._searchParams.sicCodes.filter(function (i) { return i.sicCode !== sic.sicCode; });
    };
    CompanySearchService.prototype.addEntityTypeParam = function (entitytype) {
        if (this._searchParams.entityTypes) {
        }
        else {
            this._searchParams.entityTypes = new Array();
        }
        this._searchParams.entityTypes.push(entitytype);
    };
    CompanySearchService.prototype.removeEntityTypeParam = function (entitytype) {
        this._searchParams.entityTypes = this._searchParams.entityTypes.filter(function (i) { return i.entityTypeDescription !== entitytype.entityTypeDescription; });
    };
    CompanySearchService.prototype.addSectorParam = function (sector) {
        if (this._searchParams.sectors) {
        }
        else {
            this._searchParams.sectors = new Array();
        }
        this._searchParams.sectors.push(sector);
    };
    CompanySearchService.prototype.removeSectorParam = function (sector) {
        this._searchParams.sectors = this._searchParams.sectors.filter(function (i) { return i.sectorDescription !== sector.sectorDescription; });
    };
    CompanySearchService.prototype.addIndustryParam = function (industry) {
        if (this._searchParams.industries) {
        }
        else {
            this._searchParams.industries = new Array();
        }
        this._searchParams.industries.push(industry);
    };
    CompanySearchService.prototype.removeIndustryParam = function (industry) {
        this._searchParams.industries = this._searchParams.industries.filter(function (i) { return i.industryDescription !== industry.industryDescription; });
    };
    CompanySearchService.prototype.getCompanies = function (page, pageSize) {
        //return company list data if we have
        if (this._companyList) {
            this._pagedCompanyList.count = this._companyList.length;
            this._pagedCompanyList.data = this._companyList.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize);
            return Promise.resolve(this._pagedCompanyList);
        }
        else {
            //return this.http.get(this.apiUrl + 'GetAllCompanies')
            //    .toPromise()
            //    .then(response => {
            //        this._companyList = response.json();
            //        this._pagedCompanyList.data = this._companyList.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize);
            //        this._pagedCompanyList.count = this._companyList.length;
            //        return this._pagedCompanyList;
            //    })
            //    .catch(this.handleError);
            return Promise.resolve(this._pagedCompanyList);
        }
    };
    CompanySearchService.prototype.getFilteredCompanies = function (page, pageSize) {
        var _this = this;
        var body;
        if (this._searchParams) {
            body = JSON.stringify(this._searchParams);
        }
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + 'GetAllCompanies', body, options)
            .toPromise()
            .then(function (response) {
            _this._companyList = response.json();
            _this._pagedCompanyList.data = _this._companyList.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize);
            _this._pagedCompanyList.count = _this._companyList.length;
            return _this._pagedCompanyList;
        })
            .catch(this.handleError);
    };
    CompanySearchService.prototype.getCompanySearchModel = function () {
        var _this = this;
        if (this._companySearch) {
            return Promise.resolve(this._companySearch);
        }
        else {
            return this.http.get(this.apiUrl + 'GetCompanySearch')
                .toPromise() //
                .then(function (response) {
                _this._companySearch = new company_search_models_1.CompanySearch;
                _this._companySearch = response.json();
                return _this._companySearch;
            })
                .catch(this.handleError);
        }
    };
    CompanySearchService.prototype.getCompaniesAll = function () {
        var _this = this;
        if (this._companyList) {
            return Promise.resolve(this._companyList);
        }
        else {
            return this.http.get(this.apiUrl + 'GetAllCompanies')
                .toPromise()
                .then(function (response) {
                response.json();
                _this._companyList = response.json();
            })
                .catch(this.handleError);
        }
    };
    CompanySearchService.prototype.successHandler = function (response, dataModel) {
    };
    CompanySearchService.prototype.handleError = function (error) {
        console.error('An Error Occurred ', error);
        return Promise.reject(error.message || error);
    };
    CompanySearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CompanySearchService);
    return CompanySearchService;
}());
exports.CompanySearchService = CompanySearchService;
//# sourceMappingURL=company-search.service.js.map