import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public isLogged = false;

  constructor(private userService: UserService) {
    this.userService.currentUserValue.subscribe(user => this.isLogged = !!user)
  }
}
