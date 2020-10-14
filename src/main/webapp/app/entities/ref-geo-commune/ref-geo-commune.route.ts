import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRefGeoCommune, RefGeoCommune } from 'app/shared/model/ref-geo-commune.model';
import { RefGeoCommuneService } from './ref-geo-commune.service';
import { RefGeoCommuneComponent } from './ref-geo-commune.component';
import { RefGeoCommuneDetailComponent } from './ref-geo-commune-detail.component';
import { RefGeoCommuneUpdateComponent } from './ref-geo-commune-update.component';

@Injectable({ providedIn: 'root' })
export class RefGeoCommuneResolve implements Resolve<IRefGeoCommune> {
  constructor(private service: RefGeoCommuneService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRefGeoCommune> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((refGeoCommune: HttpResponse<RefGeoCommune>) => {
          if (refGeoCommune.body) {
            return of(refGeoCommune.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RefGeoCommune());
  }
}

export const refGeoCommuneRoute: Routes = [
  {
    path: '',
    component: RefGeoCommuneComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sidotApp.refGeoCommune.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefGeoCommuneDetailComponent,
    resolve: {
      refGeoCommune: RefGeoCommuneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoCommune.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefGeoCommuneUpdateComponent,
    resolve: {
      refGeoCommune: RefGeoCommuneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoCommune.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefGeoCommuneUpdateComponent,
    resolve: {
      refGeoCommune: RefGeoCommuneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoCommune.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
