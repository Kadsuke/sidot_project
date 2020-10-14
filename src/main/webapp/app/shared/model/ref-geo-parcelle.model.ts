export interface IRefGeoParcelle {
  id?: number;
  parcelleName?: string;
}

export class RefGeoParcelle implements IRefGeoParcelle {
  constructor(public id?: number, public parcelleName?: string) {}
}
