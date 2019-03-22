import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserKey = 'currentUser';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUserValue: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(
        localStorage.getItem(this.currentUserKey)
      )
    );
    this.currentUserValue = this.currentUserSubject.asObservable();
  }

  public get currentUser(): User {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>('/login', { username, password }).pipe(
        map(
          user => {
            if (user && user.token) {
              localStorage.setItem(this.currentUserKey, JSON.stringify(user));
              this.currentUserSubject.next(user);
            }

            return user;
          }
        )
      );
  }

  public logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.currentUserSubject.next(null);
  }
}