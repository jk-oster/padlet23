import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './core/app-routing.module';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {HttpInterceptorService} from "./core/http-interceptor.service";
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './features/login/login.component';
import {AppTopBarComponent} from './features/app-top-bar/app-top-bar.component';
import {PadletIndexComponent} from './features/padlet-index/padlet-index.component';
import {PadletShowComponent} from './features/padlet-show/padlet-show.component';
import {NotFoundComponent} from './features/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PadletStoreComponent} from './features/padlet-store/padlet-store.component';
import {PadletShareComponent} from './features/padlet-share/padlet-share.component';
import {PostStoreComponent} from './features/post-store/post-store.component';
import {ModalComponent} from './features/modal/modal.component';
import { SettingsComponent } from './features/settings/settings.component';
import { DaisyuiComponent } from './features/daisyui/daisyui.component';
import { RatingComponent } from './features/rating/rating.component';

/**
 * The root module of the application.
 * - This module is the entry point to the application.
 * - It is the only module that is bootstrapped.
 * - It is the only module that is imported into the main.ts file.
 * - It declares the components, directives, and pipes that belong to the module.
 * - It imports other modules that are needed to run the application.
 * - It defines the providers that are needed to run the application.
 */
@NgModule({
  // what components, directives, and pipes belong to the module
  declarations: [
    AppComponent,
    LoginComponent,
    AppTopBarComponent,
    PadletIndexComponent,
    PadletShowComponent,
    NotFoundComponent,
    PadletStoreComponent,
    PadletShareComponent,
    PostStoreComponent,
    ModalComponent,
    SettingsComponent,
    DaisyuiComponent,
    RatingComponent
  ],
  // what other modules are needed to run this module
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  // what services does this module provide
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  // what is the main component of this module
  bootstrap: [AppComponent]
})
export class AppModule {
}
