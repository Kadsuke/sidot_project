import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRefGeoCommune } from 'app/shared/model/ref-geo-commune.model';

type EntityResponseType = HttpResponse<IRefGeoCommune>;
type EntityArrayResponseType = HttpResponse<IRefGeoCommune[]>;

@Injectable({ providedIn: 'root' })
export class RefGeoCommuneService {
  public resourceUrl = SERVER_API_URL + 'api/ref-geo-communes';

  constructor(protected http: HttpClient) {}

  create(refGeoCommune: IRefGeoCommune): Observable<EntityResponseType> {
    return this.http.post<IRefGeoCommune>(this.resourceUrl, refGeoCommune, { observe: 'response' });
  }

  update(refGeoCommune: IRefGeoCommune): Observable<EntityResponseType> {
    return this.http.put<IRefGeoCommune>(this.resourceUrl, refGeoCommune, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRefGeoCommune>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRefGeoCommune[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
