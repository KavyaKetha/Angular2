import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import { Router } from 'angular2/router';
@Component({
    selector: 'register-form',
    template: `<div class="container">
    <h1>User Form</h1>
    <form>
      <div class="form-group">
  <label for="name">Name</label>
  <input type="text" class="form-control" required
    [(ngModel)]="name" >
</div>
<div class="form-group">
  <label for="email">Email</label>
  <input type="text"  class="form-control"
    [(ngModel)]="email">
</div>
<div class="form-group">
  <label for="name">Password</label>
  <input type="text" class="form-control" required
    [(ngModel)]="password" >
</div>
      <button type="submit" class="btn btn-default"  (click)="newUser($event)">Submit</button>
    </form>
</div>`
})
export class RegisterFormComponent {
    constructor(private _router:Router){
    }
    newUser(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Registered!');
        this._router.navigate(['Users']);
    }

}