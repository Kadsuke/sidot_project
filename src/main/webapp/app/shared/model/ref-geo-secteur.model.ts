import { IRefGeoSection } from 'app/shared/model/ref-geo-section.model';

export interface IRefGeoSecteur {
  id?: number;
  secteurName?: string;
  section?: IRefGeoSection;
}

export class RefGeoSecteur implements IRefGeoSecteur {
  constructor(public id?: number, public secteurName?: string, public section?: IRefGeoSection) {}
}
