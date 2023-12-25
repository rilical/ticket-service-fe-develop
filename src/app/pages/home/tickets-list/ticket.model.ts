import {CategoriesModel} from "src/app/shared/models/categories.model";
import {DepartmentModel} from "src/app/shared/models/departments.model";
import {StatusesModel} from "src/app/shared/models/statuses.model";

export class TicketModel {
  id: number | undefined;
  name: string | undefined;
  type: number | undefined;
  description: string | undefined;
  status: number | undefined;
  stateId: number | undefined;
  departmentId: number | undefined;
  categoryId: number | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  statusesModel: StatusesModel | undefined;
  categoriesModel: CategoriesModel | undefined;
  departmentModel: DepartmentModel | undefined;
}
