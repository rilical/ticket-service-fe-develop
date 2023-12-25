import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActionLog } from 'src/app/shared/models/action-log.model';
import { ActionLogService } from 'src/app/shared/services/action-log.service';

@Component({
  selector: 'app-actions-logs',
  templateUrl: './actions-logs.component.html',
  styleUrls: ['./actions-logs.component.css']
})
export class ActionsLogsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data: {ticketId:string},private actionLogsService: ActionLogService) {
  }
  public actionsLogs?:Observable<ActionLog[]>;
  ngOnInit(){
    this.loadActionLogs();
  }
  loadActionLogs()
  {
    
    this.actionsLogs =  this.actionLogsService.getActionLogs(this.data.ticketId).pipe();  
    this.actionsLogs.forEach(console.log);
   
  }
}
