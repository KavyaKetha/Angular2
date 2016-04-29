import {Component} from 'angular2/core';
import {Router, CanActivate, RouterLink,ROUTER_DIRECTIVES, RouterOutlet} from 'angular2/router';
import {Authentication} from './authentication.service';
import {isLoggedin} from './verifyAuth';
@Component({
  selector: 'home',
  directives: [ROUTER_DIRECTIVES, RouterLink,RouterOutlet],
  templateUrl: 'partials/home.html'
})

@CanActivate(() => isLoggedin())
export class HomeComponent {
  constructor(public auth: Authentication, public router: Router) {}

  onLogout() {
    this.auth.logout()
      .subscribe(
        () => this.router.navigate(['Login']),
      );
  }
}