import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRefGeoProvince, RefGeoProvince } from 'app/shared/model/ref-geo-province.model';
import { RefGeoProvinceService } from './ref-geo-province.service';
import { RefGeoProvinceComponent } from './ref-geo-province.component';
import { RefGeoProvinceDetailComponent } from './ref-geo-province-detail.component';
import { RefGeoProvinceUpdateComponent } from './ref-geo-province-update.component';

@Injectable({ providedIn: 'root' })
export class RefGeoProvinceResolve implements Resolve<IRefGeoProvince> {
  constructor(private service: RefGeoProvinceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRefGeoProvince> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((refGeoProvince: HttpResponse<RefGeoProvince>) => {
          if (refGeoProvince.body) {
            return of(refGeoProvince.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RefGeoProvince());
  }
}

export const refGeoProvinceRoute: Routes = [
  {
    path: '',
    component: RefGeoProvinceComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sidotApp.refGeoProvince.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefGeoProvinceDetailComponent,
    resolve: {
      refGeoProvince: RefGeoProvinceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoProvince.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefGeoProvinceUpdateComponent,
    resolve: {
      refGeoProvince: RefGeoProvinceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoProvince.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefGeoProvinceUpdateComponent,
    resolve: {
      refGeoProvince: RefGeoProvinceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoProvince.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
