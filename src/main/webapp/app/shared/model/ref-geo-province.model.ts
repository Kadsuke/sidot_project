import { IRefGeoRegion } from 'app/shared/model/ref-geo-region.model';

export interface IRefGeoProvince {
  id?: number;
  provinceName?: string;
  region?: IRefGeoRegion;
}

export class RefGeoProvince implements IRefGeoProvince {
  constructor(public id?: number, public provinceName?: string, public region?: IRefGeoRegion) {}
}
