import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoRegion, RefGeoRegion } from 'app/shared/model/ref-geo-region.model';
import { RefGeoRegionService } from './ref-geo-region.service';
import { IRefGeoProvince } from 'app/shared/model/ref-geo-province.model';
import { RefGeoProvinceService } from 'app/entities/ref-geo-province/ref-geo-province.service';

@Component({
  selector: 'jhi-ref-geo-region-update',
  templateUrl: './ref-geo-region-update.component.html',
})
export class RefGeoRegionUpdateComponent implements OnInit {
  isSaving = false;
  provinces: IRefGeoProvince[] = [];

  editForm = this.fb.group({
    id: [],
    regionName: [],
    province: [],
  });

  constructor(
    protected refGeoRegionService: RefGeoRegionService,
    protected refGeoProvinceService: RefGeoProvinceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoRegion }) => {
      this.updateForm(refGeoRegion);

      this.refGeoProvinceService
        .query({ filter: 'refgeoregion-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoProvince[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoProvince[]) => {
          if (!refGeoRegion.province || !refGeoRegion.province.id) {
            this.provinces = resBody;
          } else {
            this.refGeoProvinceService
              .find(refGeoRegion.province.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoProvince>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoProvince[]) => (this.provinces = concatRes));
          }
        });
    });
  }

  updateForm(refGeoRegion: IRefGeoRegion): void {
    this.editForm.patchValue({
      id: refGeoRegion.id,
      regionName: refGeoRegion.regionName,
      province: refGeoRegion.province,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoRegion = this.createFromForm();
    if (refGeoRegion.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoRegionService.update(refGeoRegion));
    } else {
      this.subscribeToSaveResponse(this.refGeoRegionService.create(refGeoRegion));
    }
  }

  private createFromForm(): IRefGeoRegion {
    return {
      ...new RefGeoRegion(),
      id: this.editForm.get(['id'])!.value,
      regionName: this.editForm.get(['regionName'])!.value,
      province: this.editForm.get(['province'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoRegion>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IRefGeoProvince): any {
    return item.id;
  }
}
