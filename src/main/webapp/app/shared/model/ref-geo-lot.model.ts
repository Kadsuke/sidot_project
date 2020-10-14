import { IRefGeoParcelle } from 'app/shared/model/ref-geo-parcelle.model';

export interface IRefGeoLot {
  id?: number;
  lotName?: string;
  parcelle?: IRefGeoParcelle;
}

export class RefGeoLot implements IRefGeoLot {
  constructor(public id?: number, public lotName?: string, public parcelle?: IRefGeoParcelle) {}
}
