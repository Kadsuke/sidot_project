import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefGeoCommune } from 'app/shared/model/ref-geo-commune.model';

@Component({
  selector: 'jhi-ref-geo-commune-detail',
  templateUrl: './ref-geo-commune-detail.component.html',
})
export class RefGeoCommuneDetailComponent implements OnInit {
  refGeoCommune: IRefGeoCommune | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoCommune }) => (this.refGeoCommune = refGeoCommune));
  }

  previousState(): void {
    window.history.back();
  }
}
