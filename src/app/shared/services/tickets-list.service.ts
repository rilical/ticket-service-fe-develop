import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import { CategoriesModel } from '../models/categories.model';
import { StatusesModel } from '../models/statuses.model';
import { DepartmentModel } from '../models/departments.model';
import { ProblemModel } from '../models/problem.model';
import { PointModel } from '../models/point.model';
import { ActionModel } from '../models/action.model';
import { TaskType } from '../enums/tasktype.enum';
import CreateTicketDTO from '../models/dto/createTicket.dto';
import { StateModel } from '../models/state.model';
import { StorageService } from './storage.service';
import ClassItemModel from '../models/class-item.model';

@Injectable({providedIn: 'root'})
export class TicketService {
  private _tickets: BehaviorSubject<any> = new BehaviorSubject(null);
  private _statuses: BehaviorSubject<any> = new BehaviorSubject(null);
  private _departments: BehaviorSubject<any> = new BehaviorSubject(null);
  private _categories: BehaviorSubject<any> = new BehaviorSubject(null);
  private _problems: BehaviorSubject<any> = new BehaviorSubject(null);
  private pageIndex: number = 0;
  private pageSize: number = 10;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient,private storageService: StorageService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for data
   */
  get tickets$(): Observable<any> {
    return this._tickets.asObservable();
  }

  get departments$(): Observable<any> {
    return this._departments.asObservable();
  }

  get statuses$(): Observable<any> {
    return this._statuses.asObservable();
  }

  get categories$(): Observable<any> {
    return this._categories.asObservable();
  }

  get problems$(): Observable<any> {
    return this._problems.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get data
   */
  public getTickets(pageIndex?: number, querySearch: string = "",OrderBy:string=""): Observable<any> {
    this.pageIndex = pageIndex ? pageIndex : 0;

    if (querySearch == "")
        querySearch = "&DepartmentId=2"
    if(OrderBy !=""){
      OrderBy ="&OrderBy="+OrderBy
    }
    return this._httpClient.get(environment.apiDomain 
      + '/api/Tickets?Skip=' + (this.pageIndex * 5) 
      + '&Take=5' + querySearch
      +  OrderBy
      ).
      pipe(
      tap((response: any) =>
      {
        this._tickets.next(response.paginated);
      }),
    );
  }
  public async createTicket(dto:CreateTicketDTO): Promise<void | Error>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization","Bearer " + this.storageService.getUserToken());
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(dto),
    };
    let response = await fetch(environment.apiDomain+ '/api/Tickets',requestOptions)    
    if(response.ok){
      alert("ticket created");
      return;
    }
    return new Error(await response.text())
  }
  public getDepartments(): Observable<DepartmentModel[]> {
    return this._httpClient.get<DepartmentModel[]>(environment.apiDomain + '/api/Departments')
  }

  public getStatuses(): Observable<StatusesModel[]> {
    return this._httpClient.get<StatusesModel[]>(environment.apiDomain + '/api/Common/statuses')
  }

  public getCategories(taskType:TaskType): Observable<CategoriesModel[]> {
    return this._httpClient.get<CategoriesModel[]>(environment.apiDomain + '/api/Categories?type='+taskType)
  }

  public getProblems(): Observable<ProblemModel[]> {
    return this._httpClient.get<ProblemModel[]>(environment.apiDomain + '/api/Common/problems')

  }
  
  public getPoints(query:string): Observable<PointModel[]> {
    return this._httpClient.get<PointModel[]>(environment.apiDomain + '/api/Points/search?searchQuery='+query)
  }
  public getActions(taskType:TaskType): Observable<ActionModel[]> {
    return this._httpClient.get<ActionModel[]>(environment.apiDomain + '/api/Actions?type='+taskType)
  }
  public getStates(): Observable<StateModel[]> {
    return this._httpClient.get<StateModel[]>(environment.apiDomain + '/api/States')
  }
  public getClassItems(query:string): Observable<ClassItemModel[]> {
    return this._httpClient.get<ClassItemModel[]>(environment.apiDomain + '/api/ClassItems/search?searchQuery='+query)
  }
}
