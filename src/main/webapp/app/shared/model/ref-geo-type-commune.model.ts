export interface IRefGeoTypeCommune {
  id?: number;
  typeName?: string;
}

export class RefGeoTypeCommune implements IRefGeoTypeCommune {
  constructor(public id?: number, public typeName?: string) {}
}
