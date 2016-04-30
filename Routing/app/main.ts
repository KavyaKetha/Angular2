import { Component,provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import {ROUTER_PROVIDERS,
    RouteConfig,
    RouterOutlet,
    RouterLink,
    ROUTER_DIRECTIVES,
    HashLocationStrategy,
    LocationStrategy} from 'angular2/router';

import { ListComponent } from 'app/list.component';
import { ListService } from 'app/list.service';
import { View3Component } from 'app/view3.component';
import { RegisterFormComponent } from 'app/register.component';
@Component({
    selector: 'my-app',
    directives: [ListComponent, ROUTER_DIRECTIVES],
    styles: [`
  h1 {
    color:#545454;
    background:#02A8F4;
    padding:15px;
    box-shadow:2px 2px 2px 0 rgba(0, 0, 0, 0.3);
  }
    li{
    display: inline;
    width: 33.33%;
    float: left;
    
    }
  `],
    template: `
  <nav class="navbar navbar-inverse navbar-fixed-top" style="width: 100%;padding-botton:30px;">
    <li><a [routerLink]="['Register']">Register</a></li>
  <li><a [routerLink]="['Users']">Users</a></li>
<li><a [routerLink]="['Test1']">Test1</a></li>
  </nav>
<router-outlet></router-outlet>
  `
})
@RouteConfig([
    { path: '/users', name: 'Users', component: ListComponent },
    { path: '/', name: 'Register', component: RegisterFormComponent, useAsDefault: true },
    { path: '/test1', name: 'Test1', component: View3Component }
])
export class AppComponent {
}
bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })])