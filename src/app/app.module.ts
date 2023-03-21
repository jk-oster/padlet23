import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {HttpInterceptorService} from "./core/http-interceptor.service";
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './core/app-routing.module';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {SharedModule} from './shared/shared.module';

import {LoginComponent} from './features/login/login.component';
import {AppTopBarComponent} from './features/app-top-bar/app-top-bar.component';
import {PadletCardComponent} from './features/padlet-card/padlet-card.component';
import {PadletIndexComponent} from './features/padlet-index/padlet-index.component';
import {PadletDetailComponent} from './features/padlet-detail/padlet-detail.component';
import {NotFoundComponent} from './features/not-found/not-found.component';

@NgModule({
  // what components, directives, and pipes belong to the module
  declarations: [
    AppComponent,
    LoginComponent,
    AppTopBarComponent,
    PadletCardComponent,
    PadletIndexComponent,
    PadletDetailComponent,
    NotFoundComponent
  ],
  // what other modules are needed to run this module
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
  ],
  // what services does this module provide
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  // what is the main component of this module
  bootstrap: [AppComponent]
})
export class AppModule {
}
