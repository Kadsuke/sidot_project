import { IRefGeoCommune } from 'app/shared/model/ref-geo-commune.model';

export interface IRefGeoProvince {
  id?: number;
  provinceName?: string;
  commune?: IRefGeoCommune;
}

export class RefGeoProvince implements IRefGeoProvince {
  constructor(public id?: number, public provinceName?: string, public commune?: IRefGeoCommune) {}
}
