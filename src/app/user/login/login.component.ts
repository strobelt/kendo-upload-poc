import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loggingIn = false;

  public form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private userService: UserService,
    private fb: FormBuilder) { }

  public login() {
    this.loggingIn = true;
    const username = this.form.controls.username.value,
      password = this.form.controls.password.value;

    this.userService.login(username, password)
      .subscribe(
        user => {
          console.log('Sucesso!', user);
        },
        err => {
          console.log('Erro na autenticação', err)
        }
      )
  }

}
