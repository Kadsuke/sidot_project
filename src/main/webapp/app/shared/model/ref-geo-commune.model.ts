import { IRefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';

export interface IRefGeoCommune {
  id?: number;
  communeName?: string;
  localite?: IRefGeoLocalite;
}

export class RefGeoCommune implements IRefGeoCommune {
  constructor(public id?: number, public communeName?: string, public localite?: IRefGeoLocalite) {}
}
