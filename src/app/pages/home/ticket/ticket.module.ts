import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material Modules (Add if required)
import { MatDialogModule } from '@angular/material/dialog';

// Import components used in the ticket module
import { TicketComponent } from './ticket.component';
import { TicketTrackerComponent } from './Popups/ticket-tracker/ticket-tracker.component';
import { ActionsLogsComponent } from './Popups/actions-logs/actions-logs.component';
import { AttachCallsComponent } from './Popups/attach-calls/attach-calls.component';

// Import shared module if it contains shared components, directives, or pipes
import { SharedModule } from "../../../shared/shared";

@NgModule({
  declarations: [
    // Declare all components related to the ticket module
    TicketComponent,
    TicketTrackerComponent,
    ActionsLogsComponent,
    AttachCallsComponent
    // Include any other components that belong to this module
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, 
    RouterModule,
    MatDialogModule,
    SharedModule 

  ],
  exports: [
    TicketComponent,
    TicketTrackerComponent,
    ActionsLogsComponent,
    AttachCallsComponent
  ],
  providers: [
  ]
})
export class TicketModule { }
