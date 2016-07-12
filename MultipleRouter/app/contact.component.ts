import {Component} from 'angular2/core';
import {RouteData} from 'angular2/router';

import {GlobalService} from './services/globalValue.service';

@Component({
    selector: 'contact',
    templateUrl: 'partials/contact.html'
})

export class ContactComponent {
    constructor(private _globalService: GlobalService) {
        var ttes = _globalService.getStateName();
        console.log(ttes, 'here the change detected');
    }
}