import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRefGeoParcelle } from 'app/shared/model/ref-geo-parcelle.model';

type EntityResponseType = HttpResponse<IRefGeoParcelle>;
type EntityArrayResponseType = HttpResponse<IRefGeoParcelle[]>;

@Injectable({ providedIn: 'root' })
export class RefGeoParcelleService {
  public resourceUrl = SERVER_API_URL + 'api/ref-geo-parcelles';

  constructor(protected http: HttpClient) {}

  create(refGeoParcelle: IRefGeoParcelle): Observable<EntityResponseType> {
    return this.http.post<IRefGeoParcelle>(this.resourceUrl, refGeoParcelle, { observe: 'response' });
  }

  update(refGeoParcelle: IRefGeoParcelle): Observable<EntityResponseType> {
    return this.http.put<IRefGeoParcelle>(this.resourceUrl, refGeoParcelle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRefGeoParcelle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRefGeoParcelle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
