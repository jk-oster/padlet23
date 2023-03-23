import {Component} from '@angular/core';
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'tw-app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styles: []
})
export class AppTopBarComponent {

  constructor(protected auth: AuthService) {
    this.auth = auth;
  }

  logout() {
    this.auth.logout().then((data) => {
      console.log(data);
      // redirect to home page
      // this.router.navigate(['/']).then(r => console.log('logout: redirected to home page'));
    });
  }

}
