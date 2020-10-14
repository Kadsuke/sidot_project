import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefGeoParcelle } from 'app/shared/model/ref-geo-parcelle.model';

@Component({
  selector: 'jhi-ref-geo-parcelle-detail',
  templateUrl: './ref-geo-parcelle-detail.component.html',
})
export class RefGeoParcelleDetailComponent implements OnInit {
  refGeoParcelle: IRefGeoParcelle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoParcelle }) => (this.refGeoParcelle = refGeoParcelle));
  }

  previousState(): void {
    window.history.back();
  }
}
