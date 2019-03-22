import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { LogsService } from './logs.service';
import { map } from 'rxjs/operators';
import { Log } from './logs.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };

  public sortable = {
    allowUnsort: true,
    mode: 'multiple'
  };

  constructor(private logsService: LogsService) { }

  ngOnInit() {
    this.view = this.logsService.pipe(map(data => process(data, this.gridState)));
    this.logsService.read();
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.logsService.read();
  }

  public hasParams = (dataItem: Log): boolean => {
    const parsedParams = this.parse(dataItem.params);
    return !Object.keys(parsedParams).length;
  }

  public hasBody = (dataItem: Log): boolean => {
    const parsedBody = this.parse(dataItem.body);
    return !Object.keys(parsedBody).length;
  }

  public hasParamsOrBody = (dataItem: Log): boolean => {
    return this.hasParams(dataItem) || this.hasBody(dataItem);
  }

  public parse(jsonString: string) {
    return JSON.parse(jsonString);
  }
}
