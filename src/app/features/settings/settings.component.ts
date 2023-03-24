import { Component } from '@angular/core';
import {ThemeService} from "../../core/theme.service";
import {AssocArray} from "../../shared/assoc-array";

@Component({
  selector: 'tw-settings',
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent {

  settings: AssocArray = {
    theme: this.theme.getCurrentTheme()
  }
  constructor(protected theme: ThemeService) {
  }

  changeTheme() {
    this.theme.setTheme(this.settings['theme']);
  }

}
