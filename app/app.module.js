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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
//custom components & services
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var company_search_component_1 = require('./company-search/company-search.component');
var search_company_component_1 = require('./company-search/search-company.component');
var company_detail_component_1 = require('./company/company-detail.component');
//import { AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';
var company_search_service_1 = require('./company-search/shared/company-search.service');
var company_detail_service_1 = require('./company/shared/company-detail.service');
var ng2_pagination_1 = require('ng2-pagination');
var search_component_1 = require('./company-search/search.component');
var company_list_component_1 = require('./company-search/company-list.component');
var ng2_select_1 = require('ng2-select/ng2-select');
var financial_detail_component_1 = require('./financial/financial-detail.component');
var ng2_charts_1 = require('ng2-charts/ng2-charts');
//import { MdCoreModule } from '@angular2-material/core';
//import { MdListModule } from '@angular2-material/list';
//import { MdGridListModule } from '@angular2-material/grid-list';
//import { MdSidenavModule } from '@angular2-material/sidenav';
//routing
var app_routes_1 = require('./app.routes');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routes_1.routing,
                ng2_charts_1.ChartsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                company_search_component_1.CompanySearchComponent,
                ng2_pagination_1.PaginatePipe,
                ng2_pagination_1.PaginationControlsCmp,
                search_component_1.SearchComponent,
                company_list_component_1.CompanyListComponent,
                ng2_select_1.SELECT_DIRECTIVES,
                financial_detail_component_1.FinancialDetailComponent,
                company_detail_component_1.CompanyDetailComponent,
                search_company_component_1.SearchCompanyComponent
            ],
            providers: [
                company_search_service_1.CompanySearchService,
                company_detail_service_1.CompanyDetailService,
                ng2_pagination_1.PaginationService
            ],
            bootstrap: [
                app_component_1.AppComponent,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map