import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Router} from 'angular2/router';
import {Authentication} from './authentication.service';

@Component({
  selector: 'login',
  directives: [ FORM_DIRECTIVES ],
  templateUrl: 'partials/login.html'
})

export class LoginComponent {
  loginForm: ControlGroup;
  error: boolean = true;
  constructor(fb: FormBuilder, public auth: Authentication, public router: Router) {
    this.loginForm = fb.group({
      username:  ['', Validators.required],
      password:  ['', Validators.required]
    });
  }

  onSubmit(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(this.loginForm.value,'form values');
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (token: any) => this.router.navigate(['Home']),
        () => { this.error = false; }
      );
  }
}
