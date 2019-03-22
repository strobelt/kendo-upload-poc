import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isLogged = false;

  constructor(private userService: UserService,
    private router: Router) {
    this.userService.currentUserValue.subscribe(user => this.isLogged = !!user)
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
