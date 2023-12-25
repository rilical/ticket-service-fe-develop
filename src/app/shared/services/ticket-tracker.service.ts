import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ticketTracker } from "../models/ticketTracker.model";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root',
  })
export class TicketTrackerService {
 
    constructor(private _httpClient: HttpClient
        ) {
        }

    public getTicketsTracker(ticketID: string): Observable<ticketTracker[]> {
    
        return this._httpClient.get<ticketTracker[]>(environment.apiDomain 
          + '/api/TicketTracker/'+ ticketID)
      }
}