import { IRefGeoProvince } from 'app/shared/model/ref-geo-province.model';

export interface IRefGeoRegion {
  id?: number;
  regionName?: string;
  province?: IRefGeoProvince;
}

export class RefGeoRegion implements IRefGeoRegion {
  constructor(public id?: number, public regionName?: string, public province?: IRefGeoProvince) {}
}
