import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefGeoTypeCommune } from 'app/shared/model/ref-geo-type-commune.model';

@Component({
  selector: 'jhi-ref-geo-type-commune-detail',
  templateUrl: './ref-geo-type-commune-detail.component.html',
})
export class RefGeoTypeCommuneDetailComponent implements OnInit {
  refGeoTypeCommune: IRefGeoTypeCommune | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoTypeCommune }) => (this.refGeoTypeCommune = refGeoTypeCommune));
  }

  previousState(): void {
    window.history.back();
  }
}
