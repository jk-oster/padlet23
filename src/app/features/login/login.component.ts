import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'tw-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(protected auth: AuthService, private router: Router) {
    this.auth = auth;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {
    console.log(this.loginForm?.value);
    this.auth.login(this.loginForm?.value.email, this.loginForm?.value.password).then((data) => {
      console.log(data);
      // redirect to home page
      this.router.navigate(['/']).then(r => console.log('login: redirected to home page'));
    });
  }

  logout() {
    this.auth.logout().then((data: any) => {
      console.log(data);
      // redirect to home page
      this.router.navigate(['/']).then(r => console.log('logout: redirected to home page'));
    });
  }
}
