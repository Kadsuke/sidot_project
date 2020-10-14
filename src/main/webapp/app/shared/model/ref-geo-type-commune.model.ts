import { IRefGeoCommune } from 'app/shared/model/ref-geo-commune.model';

export interface IRefGeoTypeCommune {
  id?: number;
  typeName?: string;
  commune?: IRefGeoCommune;
}

export class RefGeoTypeCommune implements IRefGeoTypeCommune {
  constructor(public id?: number, public typeName?: string, public commune?: IRefGeoCommune) {}
}
