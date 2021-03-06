import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];
  private logSource = new BehaviorSubject<Log>({id : null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  constructor() {
    // this.logs = [
    //   {id: '1', text: 'Generated Components', date: new Date('12/23/2019 12:54:23')},
    //   {id: '2', text: 'Added Bootstrap', date: new Date('12/23/2019 12:54:23')},
    //   {id: '3', text: 'Added Logs Components', date: new Date('12/23/2019 12:54:23')}
    // ]
    this.logs = [];
   }

   getLogs(): Observable<Log[]>{
     if(localStorage.getItem('logs') === null){
      this.logs = [];
     }
    this.logs =  JSON.parse(localStorage.getItem('logs'));
     return of(this.logs.sort((a,b)=>{
       return b.date = a.date
     }));
   }

   setFormLog(log: Log){
    this.logSource.next(log);
   }

   addLog(log: Log){
     this.logs.unshift(log);
     //Add to localstorage.
     localStorage.setItem('logs', JSON.stringify(this.logs));
   }
   updateLog(log: Log){
     this.logs.forEach((cur, index)=>{
       if(log.id === cur.id){
         this.logs.splice(index,1)
       }
       else
         this.logs.unshift(log);
         localStorage.setItem('logs', JSON.stringify(this.logs));
     });
   }
   deleteLog(log){
     this.logs.forEach((cur,index)=>{
       if(log.id === cur.id){
         this.logs.splice(index,1);
       }
     });
     localStorage.setItem('logs', JSON.stringify(this.logs));
   }
}
