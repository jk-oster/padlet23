import { Component } from '@angular/core';

@Component({
  // we can use the selector to use this component in other components
  // for example <tw-root></tw-root> is used in index.html
  // the prefix tw is defined in angular.json
  selector: 'tw-root',
  // template url is the html file that will be used for this component
  templateUrl: './app.component.html',
  // styles is the css file that will be used for this component
  styles: []
})
export class AppComponent {
  // title is a property of this component
  title = 'padlet23';
}
