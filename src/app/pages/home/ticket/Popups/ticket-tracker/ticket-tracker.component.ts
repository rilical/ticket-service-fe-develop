import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { ticketTracker } from 'src/app/shared/models/ticketTracker.model';
import { TicketTrackerService } from 'src/app/shared/services/ticket-tracker.service';

@Component({
  selector: 'app-ticket-tracker',
  templateUrl: './ticket-tracker.component.html',
  styleUrls: ['./ticket-tracker.component.css'],  
  changeDetection: ChangeDetectionStrategy.Default
})
export class TicketTrackerComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data: {ticketId:string},private ticketTrackerService: TicketTrackerService){
   
  }
  public ticketTracks?:Observable<ticketTracker[]>;
  ngOnInit(){
    this.loadTicketTracker();
  }
  loadTicketTracker()
  {
    
    this.ticketTracks =  this.ticketTrackerService.getTicketsTracker(this.data.ticketId).pipe();  
  }


}
