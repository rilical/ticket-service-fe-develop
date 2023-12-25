import { TaskType } from "../../enums/tasktype.enum";
import TicketReplyModel from "../ticket-replay.model";

export default class CreateTicketDTO{
   constructor(Name:string,Description:string,Type:TaskType,Status:number,DepartmentId:number,StateId:number,ProblemId:number,IsHighImpactTicket:boolean,LockedToIssuer:boolean,ActionId:number,CategoryId:number,PrivacyTypeId:number){
    this.Name=Name;
    this.Type=Type;
    this.Description=Description;    
    this.Status= Status;
    this.DepartmentId=DepartmentId;
    this.StateId=StateId;
    this.ProblemId=ProblemId;
    this.IsHighImpactTicket=IsHighImpactTicket;
    this.LockedToIssuer=LockedToIssuer;
    this.CategoryId=CategoryId;
    this.PrivacyTypeId=PrivacyTypeId;
    this.Reply =  new TicketReplyModel("this is created reply from the new ticket service",ActionId,1,1,1,1,1);
   }
   Name:string;
   Description:string 
   Type:TaskType;
   Status:number;
   DepartmentId:number;
   PointId:number | undefined;
   ClassItemId:number | undefined;
   CategoryId:number | undefined;
   StateId:number;
   TicketSourceId:number |undefined;
   PrivacyTypeId:number | undefined;
   ParentTicketId: number | undefined;
   ProblemId: number ;
   TemplateId:number | undefined;
   BindWindow:number | undefined;
   IsHighImpactTicket:boolean;
   LockedToIssuer:boolean;
   Reply:TicketReplyModel;
}
