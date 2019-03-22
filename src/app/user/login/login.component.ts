import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute,
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
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        () => {
          this.loggingIn = false;
          this.snackBar.open('Wrong username or password', 'OK');
        }
      )
  }

}
