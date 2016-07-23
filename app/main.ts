//usual bootstrapping
import { HTTP_PROVIDERS } from '@angular/http';
import { FORM_PROVIDERS } from '@angular/common';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    FORM_PROVIDERS
])
.catch(err => console.error(err)); 

