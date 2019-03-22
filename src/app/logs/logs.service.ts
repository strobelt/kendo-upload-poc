import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap, map } from 'rxjs/operators';
import { Log } from './logs.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService extends BehaviorSubject<Log[]> {
  constructor(private http: HttpClient) {
    super([]);
  }

  private data: any[] = [];
  private route = '/logs';

  public read() {
    if (this.data.length) {
      return super.next(this.data);
    }

    this.fetch()
      .pipe(
        tap(data => {
          this.data = data;
          console.log(this.data);
        })
      )
      .subscribe(data => {
        super.next(data);
      });
  }

  private fetch = (): Observable<any> =>
    this.http
      .get(`${this.route}`)
      .pipe(
        map(res => {
          return (<Log[]>res).map(l => <Log>{ ...l, date: new Date(l.date) });
        })
      )
}
