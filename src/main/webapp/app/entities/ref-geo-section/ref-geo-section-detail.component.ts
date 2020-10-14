import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefGeoSection } from 'app/shared/model/ref-geo-section.model';

@Component({
  selector: 'jhi-ref-geo-section-detail',
  templateUrl: './ref-geo-section-detail.component.html',
})
export class RefGeoSectionDetailComponent implements OnInit {
  refGeoSection: IRefGeoSection | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoSection }) => (this.refGeoSection = refGeoSection));
  }

  previousState(): void {
    window.history.back();
  }
}
