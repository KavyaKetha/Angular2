import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import { Router } from 'angular2/router';
@Component({
    selector: 'register-form',
    templateUrl: 'partials/register.html'
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