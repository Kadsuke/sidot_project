import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRefGeoSection, RefGeoSection } from 'app/shared/model/ref-geo-section.model';
import { RefGeoSectionService } from './ref-geo-section.service';
import { RefGeoSectionComponent } from './ref-geo-section.component';
import { RefGeoSectionDetailComponent } from './ref-geo-section-detail.component';
import { RefGeoSectionUpdateComponent } from './ref-geo-section-update.component';

@Injectable({ providedIn: 'root' })
export class RefGeoSectionResolve implements Resolve<IRefGeoSection> {
  constructor(private service: RefGeoSectionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRefGeoSection> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((refGeoSection: HttpResponse<RefGeoSection>) => {
          if (refGeoSection.body) {
            return of(refGeoSection.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RefGeoSection());
  }
}

export const refGeoSectionRoute: Routes = [
  {
    path: '',
    component: RefGeoSectionComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sidotApp.refGeoSection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefGeoSectionDetailComponent,
    resolve: {
      refGeoSection: RefGeoSectionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoSection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefGeoSectionUpdateComponent,
    resolve: {
      refGeoSection: RefGeoSectionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoSection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefGeoSectionUpdateComponent,
    resolve: {
      refGeoSection: RefGeoSectionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoSection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
