import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRefGeoLocalite, RefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';
import { RefGeoLocaliteService } from './ref-geo-localite.service';
import { RefGeoLocaliteComponent } from './ref-geo-localite.component';
import { RefGeoLocaliteDetailComponent } from './ref-geo-localite-detail.component';
import { RefGeoLocaliteUpdateComponent } from './ref-geo-localite-update.component';

@Injectable({ providedIn: 'root' })
export class RefGeoLocaliteResolve implements Resolve<IRefGeoLocalite> {
  constructor(private service: RefGeoLocaliteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRefGeoLocalite> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((refGeoLocalite: HttpResponse<RefGeoLocalite>) => {
          if (refGeoLocalite.body) {
            return of(refGeoLocalite.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RefGeoLocalite());
  }
}

export const refGeoLocaliteRoute: Routes = [
  {
    path: '',
    component: RefGeoLocaliteComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sidotApp.refGeoLocalite.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefGeoLocaliteDetailComponent,
    resolve: {
      refGeoLocalite: RefGeoLocaliteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoLocalite.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefGeoLocaliteUpdateComponent,
    resolve: {
      refGeoLocalite: RefGeoLocaliteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoLocalite.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefGeoLocaliteUpdateComponent,
    resolve: {
      refGeoLocalite: RefGeoLocaliteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoLocalite.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
