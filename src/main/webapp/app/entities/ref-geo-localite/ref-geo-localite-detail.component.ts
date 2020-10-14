import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';

@Component({
  selector: 'jhi-ref-geo-localite-detail',
  templateUrl: './ref-geo-localite-detail.component.html',
})
export class RefGeoLocaliteDetailComponent implements OnInit {
  refGeoLocalite: IRefGeoLocalite | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoLocalite }) => (this.refGeoLocalite = refGeoLocalite));
  }

  previousState(): void {
    window.history.back();
  }
}
