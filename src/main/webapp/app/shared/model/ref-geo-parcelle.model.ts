import { IRefGeoLot } from 'app/shared/model/ref-geo-lot.model';

export interface IRefGeoParcelle {
  id?: number;
  parcelleName?: string;
  lot?: IRefGeoLot;
}

export class RefGeoParcelle implements IRefGeoParcelle {
  constructor(public id?: number, public parcelleName?: string, public lot?: IRefGeoLot) {}
}
