import {Component, OnInit, ElementRef} from '@angular/core';

import {CompanySearchService} from './company-search.service';
import {CompanyList} from './company-search.models';

@Component({
    selector: 'autocomplete',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    template: `
            <div class="input-field col s12">
              <input id="company" type="text" class="validate filter-input" [(ngModel)]="query" (keyup)="filter($event)" (blur)="handleBlur()">
            </div>
            <div class="suggestions" *ngIf="filteredList.length > 0">
                <ul *ngFor="let item of filteredList;let idx = index" (click)="select(item.companyName)">
                    <li [class.complete-selected]="idx == selectedIdx">
                        <a>{{item.companyName}}</a>
                    </li>
                </ul>
            </div>	
        `
})
export class AutoCompleteComponent implements OnInit{

    public query = '';
    public companies = [];
    public filteredList = [];
    public elementRef;
    public selectedIdx : number;

    constructor(myElement: ElementRef,
        private companySearchProvider: CompanySearchService) {
        this.elementRef = myElement;
        this.selectedIdx = -1;
    }

    ngOnInit() {
        this.bindTemplate();
    }

    bindTemplate() {

        //get vm data back from service
        this.getCompanies();
    }

    getCompanies() {
        this.companySearchProvider.getCompanies()
            .then(response => this.successHandler(response))
            .catch(error => this.logError(error));
    }

    successHandler(response: any) {
        this.companies = response;
    }

    logError(error: any) {
        console.error('error inside form bind OnInit ' + error);
    }

    filter(event: any) {
        if (this.query !== "") {
            this.filteredList = this.companies.filter(function (el) {
                //console.log('im filtering on..' + el.ff_co_name.toString());
                return el.companyName.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
            if (event.code == "ArrowDown" && this.selectedIdx < this.filteredList.length) {
                this.selectedIdx--;
            } else if (event.code == "ArrowUp" && this.selectedIdx > 0) {
                this.selectedIdx--;
            }
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        console.log('getting clicked');
        this.query = item.companyName;
        this.filteredList = [];
        this.selectedIdx = -1;
    }

    handleBlur() {
        if (this.selectedIdx > -1) {
            this.query = this.filteredList[this.selectedIdx];
        }
        this.filteredList = [];
        this.selectedIdx = -1;
    }

    handleKeyDown(event: any) {
        // Prevent default actions of arrows
        if (event.keyCode == 40 || event.keyCode == 38) {
            event.preventDefault();
        }
    }

    handleClick(event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
        this.selectedIdx = -1;
    }
}