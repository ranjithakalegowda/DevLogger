import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  log: Log;

  id: string;
  text: string;
  date: string;

  isNew: boolean;

  constructor(private logSerive: LogService) { }

  ngOnInit() {
    this.logSerive.selectedLog.subscribe(
      log => {
        if(log.id !== null){
          this.isNew = false;
          this.id = log.id;
          this.text = log.text;
          this.date = log.date;
        }
      }
    )
  }
  onSubmit(){
    if(!this.isNew){
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }
      this.logSerive.addLog(newLog);
    }
    else{
      const updtLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      this.logSerive.updateLog(updtLog);
    }
    this.clearState();
 }

 clearState(){
   this.isNew = true;
   this.id = '';
   this.text = '',
   this.date = ''
 }

  generateId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
