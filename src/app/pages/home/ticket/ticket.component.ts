import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ticketTracker } from 'src/app/shared/models/ticketTracker.model';
import { TicketTrackerService } from 'src/app/shared/services/ticket-tracker.service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { Reply } from 'src/app/shared/models/reply.model';

import { TicketTrackerComponent } from './Popups/ticket-tracker/ticket-tracker.component';
import { ActionsLogsComponent } from './Popups/actions-logs/actions-logs.component';
import { AttachCallsComponent } from './Popups/attach-calls/attach-calls.component';

@Component({
  selector: 'app-ticket',
  templateUrl: "./ticket.component.html",
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements OnInit {
  replyForm: FormGroup; 
  ticketId: number;
  replies: Reply[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ticketId: number },
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private ticketService: TicketService
  ) {
    this.ticketId = data.ticketId;
    this.replyForm = this.formBuilder.group({
      message: ['', Validators.required],
      attachments: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReplies();
  }

  loadReplies(): void {
    this.ticketService.getReplies(this.ticketId).subscribe(
      (replies: Reply[]) => {
        this.replies = replies;
      },
      (error: any) => {
        console.error('Error loading replies:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.replyForm.get('attachments')?.setValue(fileList[0]);
    }
  }

  onSubmitReply(): void {
    if (this.replyForm.valid) {
      const formData = new FormData();
      formData.append('message', this.replyForm.value.message);
      if (this.replyForm.value.attachments) {
        formData.append('attachment', this.replyForm.value.attachments);
      }
      formData.append('ticketId', this.ticketId.toString());
      formData.append('actionId', '1049');
      formData.append('userId', '3639');

      this.http.post('/api/tickets/replies', formData).subscribe(
        (response: any) => {
          console.log('Reply submitted successfully', response);
          const newReply = response as Reply; // Cast response to Reply
          this.replies.push(newReply);
          this.replyForm.reset();
          alert('Reply submitted successfully');
        },
        error => {
          console.error('Error submitting reply:', error);
          alert('Error submitting reply');
        }
      );
    }
  }


  onTicketTrackerClick(){
    
    let dialogRef = this.dialog.open(TicketTrackerComponent, {
      height: '600px',
      width: '900px',
      data: { ticketId: this.ticketId }
    });
  }
  onActionsLogsClick(){
    
    let dialogRef = this.dialog.open(ActionsLogsComponent, {
      height: '600px',
      width: '810px',
      data: {  ticketId: this.ticketId  }
    });
  }
  onAttachCallClick(){
    
    let dialogRef = this.dialog.open(AttachCallsComponent, {
      height: '600px',
      width: '650px',
      data: {  ticketId: this.ticketId  }
    });
  }
}
