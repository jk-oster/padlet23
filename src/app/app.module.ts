import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';

import {HttpInterceptorService} from "./core/interceptors/http-interceptor.service";
import {AppRoutingModule} from './core/app-routing.module';
import {SharedModule} from './shared/shared.module';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoginComponent} from './features/login/login.component';
import {AppTopBarComponent} from './features/app-top-bar/app-top-bar.component';

@NgModule({
  // what components, directives, and pipes belong to the module
  declarations: [
    AppComponent,
    LoginComponent,
    AppTopBarComponent
  ],
  // what other modules are needed to run this module
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
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
