export default class TicketReplyModel{
    /**
     *
     */
    constructor(Name:string,ActionId:number,ActionStatusId:number,ActionTypeID:number,PrivacyTypeID:number,ActionRepeatTimes:number,DepartmentID:number) {
        this.Name=Name
        this.ActionId=ActionId;
        this.ActionStatusId=ActionStatusId;
        this.ActionTypeID=ActionTypeID;
        this.PrivacyTypeID=PrivacyTypeID;
        this.ActionRepeatTimes=ActionRepeatTimes;
        this.DepartmentID=DepartmentID;  
    }
 Name:string | null =null;
 ActionId:number | null =null;
 ActionStatusId:number | null =null;
 ActionTypeID:number | null =null;
 PrivacyTypeID:number | null =null;
 ActionRepeatTimes:number | null =null;
 DepartmentID:number | null =null;

}