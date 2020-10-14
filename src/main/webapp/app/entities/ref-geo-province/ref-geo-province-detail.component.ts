import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefGeoProvince } from 'app/shared/model/ref-geo-province.model';

@Component({
  selector: 'jhi-ref-geo-province-detail',
  templateUrl: './ref-geo-province-detail.component.html',
})
export class RefGeoProvinceDetailComponent implements OnInit {
  refGeoProvince: IRefGeoProvince | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoProvince }) => (this.refGeoProvince = refGeoProvince));
  }

  previousState(): void {
    window.history.back();
  }
}
