import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRefGeoLot, RefGeoLot } from 'app/shared/model/ref-geo-lot.model';
import { RefGeoLotService } from './ref-geo-lot.service';
import { RefGeoLotComponent } from './ref-geo-lot.component';
import { RefGeoLotDetailComponent } from './ref-geo-lot-detail.component';
import { RefGeoLotUpdateComponent } from './ref-geo-lot-update.component';

@Injectable({ providedIn: 'root' })
export class RefGeoLotResolve implements Resolve<IRefGeoLot> {
  constructor(private service: RefGeoLotService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRefGeoLot> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((refGeoLot: HttpResponse<RefGeoLot>) => {
          if (refGeoLot.body) {
            return of(refGeoLot.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RefGeoLot());
  }
}

export const refGeoLotRoute: Routes = [
  {
    path: '',
    component: RefGeoLotComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sidotApp.refGeoLot.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefGeoLotDetailComponent,
    resolve: {
      refGeoLot: RefGeoLotResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoLot.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefGeoLotUpdateComponent,
    resolve: {
      refGeoLot: RefGeoLotResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoLot.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefGeoLotUpdateComponent,
    resolve: {
      refGeoLot: RefGeoLotResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoLot.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
