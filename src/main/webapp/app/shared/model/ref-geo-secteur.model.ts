import { IRefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';

export interface IRefGeoSecteur {
  id?: number;
  secteurName?: string;
  localite?: IRefGeoLocalite;
}

export class RefGeoSecteur implements IRefGeoSecteur {
  constructor(public id?: number, public secteurName?: string, public localite?: IRefGeoLocalite) {}
}
