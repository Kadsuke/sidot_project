import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRefGeoRegion } from 'app/shared/model/ref-geo-region.model';

type EntityResponseType = HttpResponse<IRefGeoRegion>;
type EntityArrayResponseType = HttpResponse<IRefGeoRegion[]>;

@Injectable({ providedIn: 'root' })
export class RefGeoRegionService {
  public resourceUrl = SERVER_API_URL + 'api/ref-geo-regions';

  constructor(protected http: HttpClient) {}

  create(refGeoRegion: IRefGeoRegion): Observable<EntityResponseType> {
    return this.http.post<IRefGeoRegion>(this.resourceUrl, refGeoRegion, { observe: 'response' });
  }

  update(refGeoRegion: IRefGeoRegion): Observable<EntityResponseType> {
    return this.http.put<IRefGeoRegion>(this.resourceUrl, refGeoRegion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRefGeoRegion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRefGeoRegion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
