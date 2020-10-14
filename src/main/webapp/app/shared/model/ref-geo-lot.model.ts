import { IRefGeoSection } from 'app/shared/model/ref-geo-section.model';

export interface IRefGeoLot {
  id?: number;
  lotName?: string;
  section?: IRefGeoSection;
}

export class RefGeoLot implements IRefGeoLot {
  constructor(public id?: number, public lotName?: string, public section?: IRefGeoSection) {}
}
