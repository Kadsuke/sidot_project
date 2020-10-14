import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefGeoLot } from 'app/shared/model/ref-geo-lot.model';

@Component({
  selector: 'jhi-ref-geo-lot-detail',
  templateUrl: './ref-geo-lot-detail.component.html',
})
export class RefGeoLotDetailComponent implements OnInit {
  refGeoLot: IRefGeoLot | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoLot }) => (this.refGeoLot = refGeoLot));
  }

  previousState(): void {
    window.history.back();
  }
}
