export class CategoriesModel {
  id: number | undefined;
  name: string | undefined;
  parentId: number | undefined | null;
  departmentId: number | undefined | null;
  typeId: number | undefined;
  description: string | undefined;
}

