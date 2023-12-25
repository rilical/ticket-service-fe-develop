import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../../shared/services/tickets-list.service';

import {BehaviorSubject, Subject} from 'rxjs';
import {TicketModel} from './ticket.model';
import {DepartmentModel} from 'src/app/shared/models/departments.model';
import {CategoriesModel} from 'src/app/shared/models/categories.model';
import {StatusesModel} from 'src/app/shared/models/statuses.model';
import {PageEvent} from '@angular/material/paginator';
import {FormsModule, NgModel} from '@angular/forms';
import {ShareTokenDailogDialog} from './ticket-filter/share-token-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {StorageService} from 'src/app/shared/services/storage.service';
import {SharedModule} from 'src/app/shared/shared';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
  standalone: true,
  imports: [SharedModule,FormsModule]
})
export class TicketsListComponent implements OnInit {
  searchText = "";
  searchQuery = "";
  sortDirection="asc";
  pageCount = 50;
  tickets$: BehaviorSubject<TicketModel[]> = new BehaviorSubject<TicketModel[]>([]);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  SelectedSortColumn:string="";
  constructor(private strageService: StorageService, private _ticketService: TicketService, public dialog: MatDialog) {

  }

  /*
         initialize html
  */
  ngOnInit(): void {
    this._ticketService.getTickets().subscribe();

    this._ticketService.tickets$
      .subscribe((tickets: TicketModel[]) => {
        tickets?.forEach((ticket: TicketModel) => {
          let statuses: StatusesModel[] | null;
          statuses = this.strageService.getItemByJustKey("statuses")
          const status = statuses?.find((obj) => {

            return obj.id == ticket.status;
          });
          ticket.statusesModel = status;
          //-------------------------------------------\

          let categories: CategoriesModel[] | null;
          categories = this.strageService.getItemByJustKey("categories")
          const category = categories?.find((obj) => {
            return obj.id == ticket.categoryId;
          });
          ticket.categoriesModel = category;
          //-------------------------------------------
          let departments: DepartmentModel[] | null;
          departments = this.strageService.getItemByJustKey("departments")
          const department = departments?.find((obj) => {
            return obj.id == ticket.departmentId;
          });
          ticket.departmentModel = department;
        })
        this.tickets$.next(tickets);

      });

    //-------------------
    //-------------------------------
  }

  onchangeSearch(event: any) {
    this.searchText = event.target.value;

  }

  search() {
    this.searchQuery = ""
    this.searchQuery += "&DepartmentId=2&SearchQuery=" + this.searchText
    this._ticketService.getTickets(0, this.searchQuery).subscribe();

  }
  ToggleSortDirection(event: any) {
    
    if(this.sortDirection=="desc") 
    {
      this.sortDirection="asc";
      event.target.innerText="Ascending";
    }
    else
    {
      this.sortDirection="desc";
      event.target.innerText="Descending"
    }
    if(this.SelectedSortColumn!="")
      this._ticketService.getTickets(0, this.searchQuery,this.SelectedSortColumn+" "+this.sortDirection).subscribe();
    
    
  }
  OnSelectSortColumn(event: any){
    this.SelectedSortColumn = event.target.value;
    this._ticketService.getTickets(0, this.searchQuery,this.SelectedSortColumn+" "+this.sortDirection).subscribe();
  }
  openDialog(): void {

    let inputModel: NgModel;
    const dialogRef = this.dialog.open(ShareTokenDailogDialog, {
      data: {cvName: "filter", shareToken: "search"},
    });
    dialogRef.afterOpened().subscribe(result => {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.searchQuery = result.searchQuery
      console.log("dialogRef", result.searchQuery)
      this._ticketService.getTickets(0, result.searchQuery).subscribe();
      // alert("afterClosed")
      // this.shareToken = result;
    });


  }

  removeFilter() {
    this.searchQuery = ""
    this._ticketService.getTickets(0, "").subscribe();
  }

  handlePageEvent(onPageChange: PageEvent) {
//  this.$pageIndex = onPageChange.pageIndex+1;
//  this.getNewData()

    this._ticketService.getTickets(onPageChange.pageIndex, this.searchQuery).subscribe();

  }

  openTicket(id: number) {
    var elems = document.getElementsByClassName("ticket");

    for (let i = 0; i < elems.length; i++) {
      elems[i].setAttribute("style", "")
    }
    let elem: any = document.getElementById("ticket" + id);
    if (elem) {
     // elem.setAttribute("style", "background:#d2e7f1;")
    }
    document.getElementsByClassName("ticket-details-container")[0].setAttribute("style", "display:initial")
    document.getElementsByClassName("tickets-tags")[0].setAttribute("style", "display:initial")
  }
}


