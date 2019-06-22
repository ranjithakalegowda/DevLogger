import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[];
  loaded: boolean = false;

  constructor(private logSerivce: LogService) { }

  ngOnInit() {
  this.logSerivce.getLogs().subscribe(
    logs => {this.logs = logs;
    this.loaded = true;
    });
  }
  onSelect(log:Log){
    this.logSerivce.setFormLog(log);
  }
  onDelete(log:Log){
    if(confirm("Are you sure?"))
    this.logSerivce.deleteLog(log);
  }
}
