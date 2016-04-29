import {provide, Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS,
    RouteConfig,
    ROUTER_DIRECTIVES,
    RouterOutlet,
    RouterLink,
    LocationStrategy,
    HashLocationStrategy} from 'angular2/router';
import {Authentication} from './authentication.service';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES]
  template: `
<router-outlet></router-outlet>
  `
})
@RouteConfig([
    { path: '/home', name: 'Home', component: HomeComponent },
    { path: '/', name: 'Login', component: LoginComponent }
])
export class AppComponent {
}
bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    Authentication
]);