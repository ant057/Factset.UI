"use strict";
var router_1 = require('@angular/router');
//compnents
var dashboard_component_1 = require('./dashboard/dashboard.component');
var company_search_component_1 = require('./company-search/company-search.component');
var company_detail_component_1 = require('./company/company-detail.component');
var routes = [
    { path: '', redirectTo: '/companysearch', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'companysearch', component: company_search_component_1.CompanySearchComponent },
    { path: 'company/:permanentSecurityId', component: company_detail_component_1.CompanyDetailComponent } //,
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map