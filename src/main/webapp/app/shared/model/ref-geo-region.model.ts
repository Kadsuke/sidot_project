export interface IRefGeoRegion {
  id?: number;
  regionName?: string;
}

export class RefGeoRegion implements IRefGeoRegion {
  constructor(public id?: number, public regionName?: string) {}
}
