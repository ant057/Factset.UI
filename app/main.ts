//usual bootstrapping
import { HTTP_PROVIDERS } from '@angular/http';
import {FORM_PROVIDERS} from '@angular/common';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    FORM_PROVIDERS
]); 

