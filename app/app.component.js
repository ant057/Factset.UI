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
//providers
var router_deprecated_1 = require('@angular/router-deprecated');
//compnents
var dashboard_component_1 = require('./dashboard/dashboard.component');
var company_search_component_1 = require('./company-search/company-search.component');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
//services
var company_search_service_1 = require('./company-search/shared/company-search.service');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Factset UI';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, ng2_bootstrap_1.AlertComponent],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                company_search_service_1.CompanySearchService
            ]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: dashboard_component_1.DashboardComponent,
                useAsDefault: true
            },
            {
                path: '/companysearch',
                name: 'CompanySearch',
                component: company_search_component_1.CompanySearchComponent
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map