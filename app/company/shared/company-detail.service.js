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
require('rxjs/add/operator/toPromise');
var CompanyDetailService = (function () {
    function CompanyDetailService(http) {
        this.http = http;
        this.mockApiUrl = 'app/company-search/shared/industries.json';
        this.apiUrlBase = 'http://ausp-sur-sql01:54665/api/';
        this.apiUrl = this.apiUrlBase + 'Company/';
    }
    CompanyDetailService.prototype.addAccount = function (permanentSecurityId) {
        var _this = this;
        var body;
        {
            body = JSON.stringify(permanentSecurityId);
        }
        ;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + 'AddAccount/' + permanentSecurityId, body, options)
            .toPromise()
            .then(function (response) {
            if (_this._companyDetail) {
                _this._companyDetail.anchorAccount = response.json();
                return _this._companyDetail.anchorAccount;
            }
        })
            .catch(this.handleError);
    };
    CompanyDetailService.prototype.getCompanyDetail = function (permSecurityId) {
        var _this = this;
        return this.http.get(this.apiUrl + 'GetCompany/' + permSecurityId)
            .toPromise()
            .then(function (response) {
            _this._companyDetail = response.json();
            return _this._companyDetail;
        })
            .catch(this.handleError);
    };
    CompanyDetailService.prototype.getFinancials = function (permSecurityId) {
        var _this = this;
        return this.http.get(this.apiUrl + 'GetCompanyFinancials/' + permSecurityId)
            .toPromise()
            .then(function (response) {
            _this._financials = response.json();
            //other?
            return _this._financials;
        })
            .catch(this.handleError);
    };
    CompanyDetailService.prototype.getStatements = function (period, type, permSecurityId) {
        var _this = this;
        return this.http.get(this.apiUrl + 'GetCompanyFinancials/' + permSecurityId)
            .toPromise()
            .then(function (response) {
            _this._companyDetail.financialStatements = response.json();
            //other?
            switch (period) {
                case "Annual":
                    return _this._companyDetail.financialStatements.annualFinancialStatements;
                case "Quarterly":
                    return _this._companyDetail.financialStatements.quarterlyFinancialStatements;
                case "LTM":
                    return _this._companyDetail.financialStatements.ltmFinancialStatements;
                case "Semi-Annual":
                    return _this._companyDetail.financialStatements.semiAnnualFinancialStatements;
                default:
                    return _this._companyDetail.financialStatements.annualFinancialStatements;
            }
        })
            .catch(this.handleError);
    };
    CompanyDetailService.prototype.handleError = function (error) {
        console.error('An Error Occurred ', error);
        return Promise.reject(error.message || error);
    };
    CompanyDetailService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CompanyDetailService);
    return CompanyDetailService;
}());
exports.CompanyDetailService = CompanyDetailService;
//# sourceMappingURL=company-detail.service.js.map