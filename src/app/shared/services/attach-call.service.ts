import { HttpClient } from "@angular/common/http";
import AttachCall from "../models/attach-call.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AttachCallService {
    constructor(private _httpClient: HttpClient
        ) {
        }

    public getAttachCalls(ticketID: string): Observable<AttachCall[]> {
    
        return this._httpClient.get<AttachCall[]>(environment.apiDomain 
          + '/api/Calls/'+ ticketID)
      }
}