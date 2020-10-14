import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRefGeoParcelle, RefGeoParcelle } from 'app/shared/model/ref-geo-parcelle.model';
import { RefGeoParcelleService } from './ref-geo-parcelle.service';
import { RefGeoParcelleComponent } from './ref-geo-parcelle.component';
import { RefGeoParcelleDetailComponent } from './ref-geo-parcelle-detail.component';
import { RefGeoParcelleUpdateComponent } from './ref-geo-parcelle-update.component';

@Injectable({ providedIn: 'root' })
export class RefGeoParcelleResolve implements Resolve<IRefGeoParcelle> {
  constructor(private service: RefGeoParcelleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRefGeoParcelle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((refGeoParcelle: HttpResponse<RefGeoParcelle>) => {
          if (refGeoParcelle.body) {
            return of(refGeoParcelle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RefGeoParcelle());
  }
}

export const refGeoParcelleRoute: Routes = [
  {
    path: '',
    component: RefGeoParcelleComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sidotApp.refGeoParcelle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefGeoParcelleDetailComponent,
    resolve: {
      refGeoParcelle: RefGeoParcelleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoParcelle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefGeoParcelleUpdateComponent,
    resolve: {
      refGeoParcelle: RefGeoParcelleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoParcelle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefGeoParcelleUpdateComponent,
    resolve: {
      refGeoParcelle: RefGeoParcelleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoParcelle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
