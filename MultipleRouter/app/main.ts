import {Component, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS,
    RouteConfig,
    ROUTER_DIRECTIVES,
    RouterOutlet,
    RouterLink,
    LocationStrategy,
    HashLocationStrategy,
    Router,
    AuxRoute} from 'angular2/router';

import {LoginComponent} from './login.component';
import {HomeComponent} from './home.component';
import {ContactComponent} from './contact.component';
import {AboutComponent} from './about.component';

import {GlobalService} from './services/globalValue.service';

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES],
    providers:[GlobalService]
    template: `<router-outlet></router-outlet>`
})

@RouteConfig([
    { path: '/', component: LoginComponent, name: 'Login', data: { stateName: 'Login' } },
    { path: '/home', component: HomeComponent, name: 'Home', data: { stateName: 'Home' } },
    { path: '/contact', component: ContactComponent, name: 'Contact', data: { stateName: 'Contact' } },
    { path: '/about', component: AboutComponent, name: 'About', data: { stateName: 'About' } }
    //      new AuxRoute({path: '/home', component: HomeCmp})
])
export class AppComponent {
    public stateName: string = '';
    constructor(private router: Router,private _globalService:GlobalService) {
        router.subscribe(function(val) {
            this.stateName = val;
            _globalService.setStateName(val);
           
        });
    }
}

bootstrap(AppComponent, [ROUTER_PROVIDERS,GlobalService,
    provide(LocationStrategy, { useClass: HashLocationStrategy })]);