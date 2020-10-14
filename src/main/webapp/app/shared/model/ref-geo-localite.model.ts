import { IRefGeoCommune } from 'app/shared/model/ref-geo-commune.model';

export interface IRefGeoLocalite {
  id?: number;
  localiteName?: string;
  commune?: IRefGeoCommune;
}

export class RefGeoLocalite implements IRefGeoLocalite {
  constructor(public id?: number, public localiteName?: string, public commune?: IRefGeoCommune) {}
}
