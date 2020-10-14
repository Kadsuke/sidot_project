import { IRefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';

export interface IRefGeoSection {
  id?: number;
  sectionName?: string;
  secteur?: IRefGeoSecteur;
}

export class RefGeoSection implements IRefGeoSection {
  constructor(public id?: number, public sectionName?: string, public secteur?: IRefGeoSecteur) {}
}
