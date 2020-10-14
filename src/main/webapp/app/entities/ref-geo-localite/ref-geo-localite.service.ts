import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';

type EntityResponseType = HttpResponse<IRefGeoLocalite>;
type EntityArrayResponseType = HttpResponse<IRefGeoLocalite[]>;

@Injectable({ providedIn: 'root' })
export class RefGeoLocaliteService {
  public resourceUrl = SERVER_API_URL + 'api/ref-geo-localites';

  constructor(protected http: HttpClient) {}

  create(refGeoLocalite: IRefGeoLocalite): Observable<EntityResponseType> {
    return this.http.post<IRefGeoLocalite>(this.resourceUrl, refGeoLocalite, { observe: 'response' });
  }

  update(refGeoLocalite: IRefGeoLocalite): Observable<EntityResponseType> {
    return this.http.put<IRefGeoLocalite>(this.resourceUrl, refGeoLocalite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRefGeoLocalite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRefGeoLocalite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
