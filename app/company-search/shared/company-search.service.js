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
//models
var company_search_models_1 = require('./company-search.models');
require('rxjs/add/operator/toPromise');
var CompanySearchService = (function () {
    function CompanySearchService(http) {
        this.http = http;
        this.mockApiUrl = 'app/company-search/shared/industries.json';
        this.apiUrlBase = 'http://localhost:54665/api/';
        this.apiUrl = this.apiUrlBase + 'CompanySearch/';
        this._pagedCompanyList = new company_search_models_1.PagedCompanyList;
    }
    CompanySearchService.prototype.getIndustries = function () {
        return this.http.get(this.mockApiUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CompanySearchService.prototype.getCompanies = function (page, pageSize) {
        var _this = this;
        //return company list data if we have
        if (this._companyList) {
            this._pagedCompanyList.count = this._companyList.length;
            this._pagedCompanyList.data = this._companyList.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize);
            return Promise.resolve(this._pagedCompanyList);
        }
        else {
            return this.http.get(this.apiUrl + 'GetAllCompanies')
                .toPromise()
                .then(function (response) {
                _this._companyList = response.json();
                _this._pagedCompanyList.data = _this._companyList.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize);
                _this._pagedCompanyList.count = _this._companyList.length;
                return _this._pagedCompanyList;
            })
                .catch(this.handleError);
        }
    };
    CompanySearchService.prototype.getCompanySearchModel = function () {
        var _this = this;
        if (this._companySearch) {
            console.warn('into the fray');
            return Promise.resolve(this._companySearch);
        }
        else {
            return this.http.get(this.apiUrl + 'GetCompanySearch')
                .toPromise() //
                .then(function (response) {
                console.warn(response);
                _this._companySearch = new company_search_models_1.CompanySearch;
                _this._companySearch = response.json();
                return _this._companySearch;
            })
                .catch(this.handleError);
        }
    };
    CompanySearchService.prototype.getCompaniesAll = function () {
        //if (this._companyList) {
        return Promise.resolve(this._companyList);
        //} else {
        //    return this.http.get(this.apiUrl + 'GetAllCompanies')
        //        .toPromise()
        //        .then(response => {
        //            response.json();
        //            this._companyList = response.json();
        //        })
        //        .catch(this.handleError);
        //}
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