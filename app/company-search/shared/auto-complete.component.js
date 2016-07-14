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
var company_search_service_1 = require('./company-search.service');
var AutoCompleteComponent = (function () {
    function AutoCompleteComponent(myElement, companySearchProvider) {
        this.companySearchProvider = companySearchProvider;
        this.query = '';
        this.companies = [];
        this.filteredList = [];
        this.elementRef = myElement;
        this.selectedIdx = -1;
    }
    AutoCompleteComponent.prototype.ngOnInit = function () {
        this.bindTemplate();
    };
    AutoCompleteComponent.prototype.bindTemplate = function () {
        //get vm data back from service
        this.getCompanies();
    };
    AutoCompleteComponent.prototype.getCompanies = function () {
        var _this = this;
        this.companySearchProvider.getCompanies()
            .then(function (response) { return _this.successHandler(response); })
            .catch(function (error) { return _this.logError(error); });
    };
    AutoCompleteComponent.prototype.successHandler = function (response) {
        this.companies = response;
    };
    AutoCompleteComponent.prototype.logError = function (error) {
        console.error('error inside form bind OnInit ' + error);
    };
    AutoCompleteComponent.prototype.filter = function (event) {
        if (this.query !== "") {
            this.filteredList = this.companies.filter(function (el) {
                //console.log('im filtering on..' + el.ff_co_name.toString());
                return el.companyName.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
            if (event.code == "ArrowDown" && this.selectedIdx < this.filteredList.length) {
                this.selectedIdx--;
            }
            else if (event.code == "ArrowUp" && this.selectedIdx > 0) {
                this.selectedIdx--;
            }
        }
        else {
            this.filteredList = [];
        }
    };
    AutoCompleteComponent.prototype.select = function (item) {
        console.log('getting clicked');
        this.query = item.companyName;
        this.filteredList = [];
        this.selectedIdx = -1;
    };
    AutoCompleteComponent.prototype.handleBlur = function () {
        if (this.selectedIdx > -1) {
            this.query = this.filteredList[this.selectedIdx];
        }
        this.filteredList = [];
        this.selectedIdx = -1;
    };
    AutoCompleteComponent.prototype.handleKeyDown = function (event) {
        // Prevent default actions of arrows
        if (event.keyCode == 40 || event.keyCode == 38) {
            event.preventDefault();
        }
    };
    AutoCompleteComponent.prototype.handleClick = function (event) {
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
    };
    AutoCompleteComponent = __decorate([
        core_1.Component({
            selector: 'autocomplete',
            host: {
                '(document:click)': 'handleClick($event)',
            },
            template: "\n            <div class=\"input-field col s12\">\n              <input id=\"company\" type=\"text\" class=\"validate filter-input\" [(ngModel)]=\"query\" (keyup)=\"filter($event)\" (blur)=\"handleBlur()\">\n            </div>\n            <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                <ul *ngFor=\"let item of filteredList;let idx = index\" (click)=\"select(item.companyName)\">\n                    <li [class.complete-selected]=\"idx == selectedIdx\">\n                        <a>{{item.companyName}}</a>\n                    </li>\n                </ul>\n            </div>\t\n        "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, company_search_service_1.CompanySearchService])
    ], AutoCompleteComponent);
    return AutoCompleteComponent;
}());
exports.AutoCompleteComponent = AutoCompleteComponent;
//# sourceMappingURL=auto-complete.component.js.map