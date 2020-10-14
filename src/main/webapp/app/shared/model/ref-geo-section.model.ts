import { IRefGeoLot } from 'app/shared/model/ref-geo-lot.model';

export interface IRefGeoSection {
  id?: number;
  sectionName?: string;
  lot?: IRefGeoLot;
}

export class RefGeoSection implements IRefGeoSection {
  constructor(public id?: number, public sectionName?: string, public lot?: IRefGeoLot) {}
}
