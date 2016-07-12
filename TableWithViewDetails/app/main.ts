import {bootstrap} from 'angular2/platform/browser';

import {Component,provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig,
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES,
    ROUTER,
    LocationStrategy,
    HashLocationStrategy,
    RouterOutlet,
    RouterLink} from 'angular2/router';

import {TableComponent} from './table.component';
import {ViewDetailComponent} from './viewDetail.component';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', component: TableComponent, name: 'Table' },
    { path: '/viewDetails/:id', component: ViewDetailComponent, name: 'Details'},
])
export class AppComponent {

}

bootstrap(AppComponent, [HTTP_PROVIDERS,ROUTER_PROVIDERS,provide(LocationStrategy, { useClass: HashLocationStrategy })]);