import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

import { ListComponent } from 'app/list.component';
import { ListService } from 'app/list.service';

@Component({
  selector: 'my-app',
  directives: [ListComponent],
  styles: [`
  h1 {
    color:#545454;
    background:#02A8F4;
    padding:15px;
    box-shadow:2px 2px 2px 0 rgba(0, 0, 0, 0.3);
  }
  `]
  template: `
  <div>
  <h1>User List</h1>
  <my-list></my-list>
  </div>
  `
})
export class AppComponent {
}
bootstrap(AppComponent)