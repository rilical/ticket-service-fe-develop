import {Component, ElementRef, Input, Renderer2, ViewEncapsulation} from '@angular/core';
import {CreateTicketService} from "./create-ticket.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule, NgIf} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { Observable } from 'rxjs';
import { ProblemModel } from 'src/app/shared/models/problem.model';
import { CategoriesModel } from 'src/app/shared/models/categories.model';
import { PointModel } from 'src/app/shared/models/point.model';
import { ActionModel } from 'src/app/shared/models/action.model';
import { DepartmentModel } from 'src/app/shared/models/departments.model';
import { TicketService } from 'src/app/shared/services/tickets-list.service';
import { StatusesModel } from 'src/app/shared/models/statuses.model';
import { TaskType } from 'src/app/shared/enums/tasktype.enum';
import CreateTicketDTO from 'src/app/shared/models/dto/createTicket.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { StateModel } from 'src/app/shared/models/state.model';
import ClassItemModel from 'src/app/shared/models/class-item.model';

@Component({
  selector: 'create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('modalAnimation', [
      state('true', style({right: '0'})),
      state('false', style({right: '-600px'})),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('300ms ease-out')),
    ]),
  ],
  imports: [MatFormFieldModule, MatSelectModule,CommonModule , MatInputModule, FormsModule, NgIf, MatCheckboxModule]
})
export class CreateTicketComponent {
  @Input() isModalOpen: boolean = false;

 
  constructor(private createTicketService: CreateTicketService, private renderer: Renderer2, private el: ElementRef,private ticketService:TicketService) {
  }

  onCloseCreateTicket() {
    this.createTicketService.closeModal();
  }

  ngOnInit() {
    this.setDivHeight();
    window.addEventListener('resize', () => this.setDivHeight());
    this.loadData();
  }

  setDivHeight() {
    const windowHeight = window.innerHeight;
    const yourDiv = this.el.nativeElement.querySelector('#sideModal');
    this.renderer.setStyle(yourDiv, 'height', `${windowHeight}px`);
  }
  // binded Property
  title:string| null =null;
  description: string| null =null;
  statusString: string | null =null;
  departmentId: number| null =null;
  stateId: number| null =null;
  problemId: number| null =null;
  isHighTicketImpact: boolean=false;
  lockedToIssuer: boolean =false;
  categoryId: number| null =null;
  actionId:number| null =null;
  pointId:number| null =null;
  privacyTypeID:number| null=null;
  classItemId:number| null=null;
  //data
  status?:Observable<StatusesModel[]>
  problems?:Observable<ProblemModel[]>
  categories?:Observable<CategoriesModel[]>
  points?:Observable<PointModel[]>  
  actions?:Observable<ActionModel[]>
  departments?:Observable<DepartmentModel[]>
  states?:Observable<StateModel[]>
  classItems?:Observable<ClassItemModel[]>
  taskType:TaskType=TaskType.Incident;
  isIncidentTask:boolean=true
  incidentCheckboxChange(){
    this.taskType=TaskType.Incident;
    this.loadActions();
    this.loadCategories();
    this.isIncidentTask=true;
  }
  taskCheckboxChange(){   
     this.taskType=TaskType.Task; 
     this.loadActions();
     this.loadCategories();
     this.isIncidentTask=false;

   }
 
  loadProblem(){
    this.problems = this.ticketService.getProblems();
  }
  loadCategories(){
    this.categories = this.ticketService.getCategories(this.taskType);
  }
  loadPoints(query:string){
    this.points = this.ticketService.getPoints(query);
  }  
  loadStatus(){
    this.status = this.ticketService.getStatuses();
  }
  loadActions(){
    this.actions = this.ticketService.getActions(this.taskType);
  }
  loadDepartment(){
    this.departments = this.ticketService.getDepartments();
  }
  loadStates(){
    this.states = this.ticketService.getStates();
  }
  loadClassItems(query:string){
    this.classItems=this.ticketService.getClassItems(query);
  }
  loadData(){
    this.loadProblem();
    this.loadCategories();
    this.loadActions();
    this.loadDepartment();
    this.loadStatus();
    this.loadStates();
  }
  async createTicket(){

    if(this.title ==null){
      alert("you forgot to set  title ");
      return; 
    }     
    if(this.description ==null)
    {
      alert("you forgot to set description");
      return;
    }
    if(this.statusString ==null){
      alert("you forgot to set status Number");
      return;
    }
    if(this.departmentId ==null){
      alert("you forgot to set department");
      return;
    }
    if(this.stateId ==null){
      alert("you forgot to set stateID");
      return;
    }
    if(this.problemId ==null) {
      alert("you forgot to set problem");
      return;
    } 
    if(this.actionId ==null) {
      alert("you forgot to set action");
      return;
    }   
    if(this.categoryId ==null) {
      alert("you forgot to set category");
      return;
    }   
    if(this.privacyTypeID ==null) {
      alert("you forgot to set privacy type");
      return;
    }  
    let dto = new CreateTicketDTO(this.title,
      this.description,
      this.taskType,
      parseInt(this.statusString),
      this.departmentId,
      this.stateId,
      this.problemId,
      this.isHighTicketImpact,
      this.lockedToIssuer,
      this.actionId,
      this.categoryId,
      this.privacyTypeID);
      if(this. pointId!=null && this.taskType==TaskType.Incident)
      dto.PointId=this.pointId;
      if(this.taskType==TaskType.Task){
        if(this. classItemId==null){
          alert("you forgot to set class item id");
          return;
        }
        dto.ClassItemId=this.classItemId;
      }
    let result = await this.ticketService.createTicket(dto);
    if(result instanceof Error){
      console.error(result);
    }
  }
  pointKeyDown(event:any){
  //  if (event.key === 'Enter' || event.keyCode === 13) {      
      this.loadPoints(event.target.value)
    //}
   
  }
  classItemKeyDown(event:any){
   // if (event.key === 'Enter' || event.keyCode === 13) {      
      this.loadClassItems(event.target.value)
   // }
   
  }
}
