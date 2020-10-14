import { IRefGeoProvince } from 'app/shared/model/ref-geo-province.model';
import { IRefGeoTypeCommune } from 'app/shared/model/ref-geo-type-commune.model';

export interface IRefGeoCommune {
  id?: number;
  communeName?: string;
  province?: IRefGeoProvince;
  typecommune?: IRefGeoTypeCommune;
}

export class RefGeoCommune implements IRefGeoCommune {
  constructor(
    public id?: number,
    public communeName?: string,
    public province?: IRefGeoProvince,
    public typecommune?: IRefGeoTypeCommune
  ) {}
}
