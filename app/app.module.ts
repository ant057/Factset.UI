//angular
import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

//custom components & services
import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanySearchComponent } from './company-search/company-search.component'
import { SearchCompanyComponent } from './company-search/search-company.component'
import { CompanyDetailComponent } from './company/company-detail.component';
//import { AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CompanySearchService } from './company-search/shared/company-search.service';
import { CompanyDetailService } from './company/shared/company-detail.service';
import { PaginatePipe, PaginationService, PaginationControlsCmp } from 'ng2-pagination';
import { SearchComponent } from './company-search/search.component';
import { CompanyListComponent } from './company-search/company-list.component';
import { SELECT_DIRECTIVES } from 'ng2-select/ng2-select';
import { FinancialDetailComponent } from './financial/financial-detail.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { MdCoreModule } from '@angular2-material/core';
//import { MdListModule } from '@angular2-material/list';
//import { MdGridListModule } from '@angular2-material/grid-list';
//import { MdSidenavModule } from '@angular2-material/sidenav';

//routing
import { routing }              from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        ChartsModule
        //AccordionModule
        //MdCoreModule.forRoot(),
        //MdListModule.forRoot(),
        //MdGridListModule.forRoot(),
        //MdSidenavModule.forRoot()
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        CompanySearchComponent,
        PaginatePipe,
        PaginationControlsCmp,
        SearchComponent,
        CompanyListComponent,
        SELECT_DIRECTIVES,
        FinancialDetailComponent,
        CompanyDetailComponent,
        SearchCompanyComponent
    ],
    providers: [
        CompanySearchService,
        CompanyDetailService,
        PaginationService
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
