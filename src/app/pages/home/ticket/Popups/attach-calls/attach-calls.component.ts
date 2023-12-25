import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import AttachCall from 'src/app/shared/models/attach-call.model';
import { AttachCallService } from 'src/app/shared/services/attach-call.service';

@Component({
  selector: 'app-attach-calls',
  templateUrl: './attach-calls.component.html',
  styleUrls: ['./attach-calls.component.css']
})
export class AttachCallsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: {ticketId:string},private attachCallService: AttachCallService){
   
  }
  public attachCalls?:Observable<AttachCall[]>;
  ngOnInit(){
    this.loadAttachCall();
  }
  loadAttachCall()
  {
    
    this.attachCalls =  this.attachCallService.getAttachCalls(this.data.ticketId).pipe();  
  }

}
