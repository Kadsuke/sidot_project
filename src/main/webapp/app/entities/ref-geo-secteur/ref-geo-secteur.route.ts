import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRefGeoSecteur, RefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';
import { RefGeoSecteurService } from './ref-geo-secteur.service';
import { RefGeoSecteurComponent } from './ref-geo-secteur.component';
import { RefGeoSecteurDetailComponent } from './ref-geo-secteur-detail.component';
import { RefGeoSecteurUpdateComponent } from './ref-geo-secteur-update.component';

@Injectable({ providedIn: 'root' })
export class RefGeoSecteurResolve implements Resolve<IRefGeoSecteur> {
  constructor(private service: RefGeoSecteurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRefGeoSecteur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((refGeoSecteur: HttpResponse<RefGeoSecteur>) => {
          if (refGeoSecteur.body) {
            return of(refGeoSecteur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RefGeoSecteur());
  }
}

export const refGeoSecteurRoute: Routes = [
  {
    path: '',
    component: RefGeoSecteurComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sidotApp.refGeoSecteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefGeoSecteurDetailComponent,
    resolve: {
      refGeoSecteur: RefGeoSecteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoSecteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefGeoSecteurUpdateComponent,
    resolve: {
      refGeoSecteur: RefGeoSecteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoSecteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefGeoSecteurUpdateComponent,
    resolve: {
      refGeoSecteur: RefGeoSecteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sidotApp.refGeoSecteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
