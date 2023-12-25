import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActionLog } from "../models/action-log.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ActionLogService {
    constructor(private _httpClient: HttpClient
        ) {
        }

    public getActionLogs(ticketID: string): Observable<ActionLog[]> {
    
        return this._httpClient.get<ActionLog[]>(environment.apiDomain 
          + '/api/ActionLogs/'+ ticketID)
      }
}