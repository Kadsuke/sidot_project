import { IRefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';

export interface IRefGeoLocalite {
  id?: number;
  localiteName?: string;
  secteur?: IRefGeoSecteur;
}

export class RefGeoLocalite implements IRefGeoLocalite {
  constructor(public id?: number, public localiteName?: string, public secteur?: IRefGeoSecteur) {}
}
