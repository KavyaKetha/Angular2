import {Component} from 'angular2/core';
import {RouterOutlet,
    RouterLink,
    RouteData} from 'angular2/router';

import {GlobalService} from './services/globalValue.service';

@Component({
    selector: 'login',
    templateUrl: 'partials/login.html',
    providers:[GlobalService]
})
export class LoginComponent {
    public stateName: String ='' ;

    constructor(private _globalService: GlobalService) {
       this.stateName = this._globalService.getStateName();
        console.log(stateName,'asdgji');
    }
//    public test: string = 'HEllo';
}