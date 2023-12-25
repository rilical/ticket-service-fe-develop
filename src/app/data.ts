export interface IData {
  value: string;
  id: string;
  key: string;
}

// general mapper for data
export class DataClass {
  // map to IData
  public static NewInstance(data: any): IData | any {
    if (!data) {
      return null;
    }
    return {
      value: data.value,
      id: data.id,
      key: data.key,
    };
  }

  public static NewInstances(data: any[]): IData[] {
    return data.map(DataClass.NewInstance);
  }
}
