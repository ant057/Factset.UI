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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var CompanySearchService = (function () {
    function CompanySearchService(http) {
        this.http = http;
        this.apiUrl = 'app/company-search/shared/industries.json';
    }
    CompanySearchService.prototype.getIndustries = function () {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
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