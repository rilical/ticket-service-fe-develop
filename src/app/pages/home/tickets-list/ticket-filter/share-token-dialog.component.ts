import {CommonModule, NgIf} from "@angular/common";
import {Component, Inject} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {TicketService} from "../../../../shared/services/tickets-list.service";
import {StorageService} from "src/app/shared/services/storage.service";
import {CategoriesModel} from "src/app/shared/models/categories.model";
import {DepartmentModel} from "src/app/shared/models/departments.model";
import {StatusesModel} from "src/app/shared/models/statuses.model";

export interface DialogData {
  shareToken: string;
  cvName: string,
  inputModel: NgModel;
}

@Component({
  selector: 'share-token-dialog.component',
  templateUrl: 'share-token-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,

  ],
  providers: [],
})
export class ShareTokenDailogDialog {
  /*
     variables
  */
  categories: CategoriesModel[] | null;
  departments: DepartmentModel[] | null;
  statuses: StatusesModel[] | null;

  filterFrom: FormGroup<{
    id: FormControl<string | null>,
    status: FormControl<string | null>,
    type: FormControl<string | null>,
    departmentId: FormControl<string | null>,
    stateId: FormControl<string | null>,
    categoryId: FormControl<string | null>,
    originDeptId: FormControl<string | null>,
    initDeptId: FormControl<string | null>,
    ticketAction: FormControl<string | null>,
    searchQuery: FormControl<string | null>,
    createdAt: FormControl<Date | null>,
    updatedAt: FormControl<Date | null>

  }>;


  constructor(
    public dialogRef: MatDialogRef<ShareTokenDailogDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private _ticketService: TicketService,
    private strageService: StorageService

    // private _formBuilder: UntypedFormBuilder
  ) {
    this.statuses = this.strageService.getItemByJustKey("statuses")
    //-------------------------------------------\
    this.categories = this.strageService.getItemByJustKey("categories")
    //-------------------------------------------
    this.departments = this.strageService.getItemByJustKey("departments")

    this.filterFrom = this._formBuilder.group({
      id: [""],
      status: [""],
      type: [""],
      departmentId: [""],
      stateId: [""],
      categoryId: [""],
      originDeptId: [""],
      initDeptId: [""],
      ticketAction: [""],
      searchQuery: [""],
      createdAt: [new Date()],
      updatedAt: [new Date()]
    });


  }

  search() {
    let query = ""
    let id: any = this.filterFrom.controls['id'].value;
    if (id != "") {
      query += "&Id=" + id
    }
    let status: any = this.filterFrom.controls['status'].value;
    if (status != "") {
      query += "&Status=" + status
    }
    let departmentId: any = this.filterFrom.controls['departmentId'].value;
    if (departmentId != "") {
      query += "&DepartmentId=" + departmentId
    }

    let categoryId: any = this.filterFrom.controls['categoryId'].value;
    if (categoryId != "") {
      query += "&CategoryId=" + categoryId
    }
    let searchQuery: any = this.filterFrom.controls['searchQuery'].value;
    if (searchQuery != "") {
      query += "&SearchQuery=" + searchQuery
    }

    this.dialogRef.close({searchQuery: query});

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}


