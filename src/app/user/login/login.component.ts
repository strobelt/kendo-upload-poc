import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loggingIn = false;
  public authFailure = false;

  public form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  public login() {
    this.loggingIn = true;
    this.authFailure = false;

    const username = this.form.controls.username.value,
      password = this.form.controls.password.value;

    this.userService.login(username, password)
      .subscribe(
        user => {
          this.loggingIn = false;
          this.snackBar.open(`Welcome ${user.user.username}`, null, { duration: 2000 });
          // store user
          // redirect to products
        },
        () => {
          this.loggingIn = false;
          this.snackBar.open('Wrong username or password', 'OK');
        }
      )
  }

}
