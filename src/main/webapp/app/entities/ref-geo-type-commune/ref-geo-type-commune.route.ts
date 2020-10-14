import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRefGeoTypeCommune, RefGeoTypeCommune } from 'app/shared/model/ref-geo-type-commune.model';
import { RefGeoTypeCommuneService } from './ref-geo-type-commune.service';
import { RefGeoTypeCommuneComponent } from './ref-geo-type-commune.component';
import { RefGeoTypeCommuneDetailComponent } from './ref-geo-type-commune-detail.component';
import { RefGeoTypeCommuneUpdateComponent } from './ref-geo-type-commune-update.component';

@Injectable({ providedIn: 'root' })
export class RefGeoTypeCommuneResolve implements Resolve<IRefGeoTypeCommune> {
  constructor(private service: RefGeoTypeCommuneService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRefGeoTypeCommune> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((refGeoTypeCommune: HttpResponse<RefGeoTypeCommune>) => {
          if (refGeoTypeCommune.body) {
            return of(refGeoTypeCommune.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RefGeoTypeCommune());
  }
}

export const refGeoTypeCommuneRoute: Routes = [
  {
    path: '',
    component: RefGeoTypeCommuneComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sidotApp.refGeoTypeCommune.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefGeoTypeCommuneDetailComponent,
    resolve: {
      refGeoTypeCommune: RefGeoTypeCommuneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoTypeCommune.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefGeoTypeCommuneUpdateComponent,
    resolve: {
      refGeoTypeCommune: RefGeoTypeCommuneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoTypeCommune.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefGeoTypeCommuneUpdateComponent,
    resolve: {
      refGeoTypeCommune: RefGeoTypeCommuneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoTypeCommune.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
