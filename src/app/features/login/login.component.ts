import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'tw-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  errorMsg: string = '';

  constructor(protected auth: AuthService, private router: Router) {
    this.auth = auth;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm?.value.email, this.loginForm?.value.password).then((data) => {
        // redirect to home page
        this.router.navigate(['/']).then(r => console.log('login: redirected to home page'));
      }).catch((error) => {
        this.errorMsg = error.error.message || error.error.error || error.message || error.code || 'Unknow error occured';
      });
    }
    else {
        this.loginForm.markAllAsTouched();
    }
  }

  logout() {
    this.auth.logout().then((data: any) => {
      console.log(data);
      // redirect to home page
      this.router.navigate(['/']).then(r => console.log('logout: redirected to home page'));
    });
  }
}
