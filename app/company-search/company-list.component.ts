//angular
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

//services
import {CompanySearchService} from './shared/company-search.service';
//models
import {CompanyList, PagedCompanyList} from './shared/company-search.models';

@Component({
    selector: 'company-list',
    templateUrl: 'app/company-search/company-list.component.html'
})
export class CompanyListComponent implements OnInit {

    pagedData: PagedCompanyList;
    @Input() companies: CompanyList[];
    @Input() loading: boolean = false;
    @Input() page: number;
    @Input() pageSize: number = 25;
    @Input() total: number;

    public toggled: boolean = false;
    public toggleValue: string = '<';

    constructor(private companySearchProvider: CompanySearchService,
                private router: Router) {
    //
    }

    ngOnInit() {
        this.bindTemplate();
    }

    bindTemplate() {
        this.loading = true;
        //get vm data back from service
        this.getCompanyPage(1);
    }

    getCompanyPage(page: number) {
        this.companySearchProvider.getCompanies(page, this.pageSize)
            .then(response => this.successHandler(response))
            .catch(error => this.logError(error));

        this.page = page;
    }

    successHandler(response: PagedCompanyList) {
        if (response.data) {
            this.pagedData = response;
            this.companies = response.data;
            this.companies.forEach(p => p.imgUrl = this.findPicture(p.sectorCode));
            this.total = response.count;
        }
        this.loading = false;
    }

    private findPicture(sector:string): string {
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
    }

    logError(error: any) {
        console.error('error inside form bind OnInit ' + error);
    }

    selectCompany(permSecId: string) {
        this.router.navigate(['/company', permSecId]);
    }

    toggle() {
        if (this.toggled) {
            this.toggled = false;
            this.toggleValue = '<';
        }
        else {
            this.toggled = true;
            this.toggleValue = '>';
        }
    }
}