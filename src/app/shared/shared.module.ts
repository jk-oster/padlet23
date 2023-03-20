import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * The shared module is a place to put all the components, directives, and pipes that are used in multiple places in the app.
 *
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 *
 * @see https://angular.io/guide/ngmodule-faq#q-why-bad
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
