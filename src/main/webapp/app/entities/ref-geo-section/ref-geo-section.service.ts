import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRefGeoSection } from 'app/shared/model/ref-geo-section.model';

type EntityResponseType = HttpResponse<IRefGeoSection>;
type EntityArrayResponseType = HttpResponse<IRefGeoSection[]>;

@Injectable({ providedIn: 'root' })
export class RefGeoSectionService {
  public resourceUrl = SERVER_API_URL + 'api/ref-geo-sections';

  constructor(protected http: HttpClient) {}

  create(refGeoSection: IRefGeoSection): Observable<EntityResponseType> {
    return this.http.post<IRefGeoSection>(this.resourceUrl, refGeoSection, { observe: 'response' });
  }

  update(refGeoSection: IRefGeoSection): Observable<EntityResponseType> {
    return this.http.put<IRefGeoSection>(this.resourceUrl, refGeoSection, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRefGeoSection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRefGeoSection[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
