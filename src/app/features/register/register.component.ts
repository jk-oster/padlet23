import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'tw-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
  loginForm: FormGroup = new FormGroup({});
  errorMsg: string = '';

  constructor(protected auth: AuthService, private router: Router) {
    this.auth = auth;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      avatar: new FormControl('https://i.pravatar.cc/150?img=1', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_confirmation: new FormControl(), // honeypot
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  register() {
    if(this.loginForm.valid) {
      this.auth.register(this.loginForm.value).then((data) => {
        // redirect to home page
        this.router.navigate(['/']).then(r => console.log('register: redirected to home page'));
      }).catch((error) => {
        this.errorMsg = error.error.message || error.error.error || error.message || error.code || 'Unknow error occured';
      });
    } else {
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
