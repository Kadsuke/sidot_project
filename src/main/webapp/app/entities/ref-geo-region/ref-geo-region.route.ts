import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRefGeoRegion, RefGeoRegion } from 'app/shared/model/ref-geo-region.model';
import { RefGeoRegionService } from './ref-geo-region.service';
import { RefGeoRegionComponent } from './ref-geo-region.component';
import { RefGeoRegionDetailComponent } from './ref-geo-region-detail.component';
import { RefGeoRegionUpdateComponent } from './ref-geo-region-update.component';

@Injectable({ providedIn: 'root' })
export class RefGeoRegionResolve implements Resolve<IRefGeoRegion> {
  constructor(private service: RefGeoRegionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRefGeoRegion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((refGeoRegion: HttpResponse<RefGeoRegion>) => {
          if (refGeoRegion.body) {
            return of(refGeoRegion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RefGeoRegion());
  }
}

export const refGeoRegionRoute: Routes = [
  {
    path: '',
    component: RefGeoRegionComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sidotApp.refGeoRegion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefGeoRegionDetailComponent,
    resolve: {
      refGeoRegion: RefGeoRegionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoRegion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefGeoRegionUpdateComponent,
    resolve: {
      refGeoRegion: RefGeoRegionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoRegion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefGeoRegionUpdateComponent,
    resolve: {
      refGeoRegion: RefGeoRegionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoRegion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
