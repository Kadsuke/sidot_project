import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefGeoRegion } from 'app/shared/model/ref-geo-region.model';

@Component({
  selector: 'jhi-ref-geo-region-detail',
  templateUrl: './ref-geo-region-detail.component.html',
})
export class RefGeoRegionDetailComponent implements OnInit {
  refGeoRegion: IRefGeoRegion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoRegion }) => (this.refGeoRegion = refGeoRegion));
  }

  previousState(): void {
    window.history.back();
  }
}
