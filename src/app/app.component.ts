import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/auth.service";
import {ThemeService} from "./core/theme.service";

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
export class AppComponent implements OnInit {
  // title is a property of this component
  title = 'padlet23';

  // constructor is called when the component is created
  constructor(protected auth: AuthService, protected theme: ThemeService) {
  }

  // ngOnInit is a lifecycle hook that is called when the component is initialized
  ngOnInit(): void {
    this.theme.initTheme();
    AuthService.init();
  }
}
