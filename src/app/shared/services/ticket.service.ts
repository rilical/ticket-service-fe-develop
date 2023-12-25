// src/app/shared/services/ticket.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../models/reply.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) {}

  // Method to fetch replies for a ticket
  getReplies(ticketId: number): Observable<Reply[]> {
    return this.http.get<Reply[]>(`/api/tickets/${ticketId}/replies`);
  }

  // Method to submit a reply for a ticket
  submitReply(ticketId: number, replyData: any): Observable<any> {
    return this.http.post(`/api/tickets/${ticketId}/replies`, replyData);
  }
}