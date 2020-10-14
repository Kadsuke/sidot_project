import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';

@Component({
  selector: 'jhi-ref-geo-secteur-detail',
  templateUrl: './ref-geo-secteur-detail.component.html',
})
export class RefGeoSecteurDetailComponent implements OnInit {
  refGeoSecteur: IRefGeoSecteur | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoSecteur }) => (this.refGeoSecteur = refGeoSecteur));
  }

  previousState(): void {
    window.history.back();
  }
}
