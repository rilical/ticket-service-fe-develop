import {inject} from '@angular/core';
import {forkJoin} from 'rxjs';
import {TicketService} from './shared/services/tickets-list.service';

export const initialDataResolver = () => {
  // Fork join multiple API endpoint calls to wait all of them to finish
  return forkJoin([
    inject(TicketService).getDepartments(),
    inject(TicketService).getStatuses(),
  ]);
};
