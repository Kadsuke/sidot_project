import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoProvince, RefGeoProvince } from 'app/shared/model/ref-geo-province.model';
import { RefGeoProvinceService } from './ref-geo-province.service';
import { IRefGeoRegion } from 'app/shared/model/ref-geo-region.model';
import { RefGeoRegionService } from 'app/entities/ref-geo-region/ref-geo-region.service';

@Component({
  selector: 'jhi-ref-geo-province-update',
  templateUrl: './ref-geo-province-update.component.html',
})
export class RefGeoProvinceUpdateComponent implements OnInit {
  isSaving = false;
  regions: IRefGeoRegion[] = [];

  editForm = this.fb.group({
    id: [],
    provinceName: [],
    region: [],
  });

  constructor(
    protected refGeoProvinceService: RefGeoProvinceService,
    protected refGeoRegionService: RefGeoRegionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoProvince }) => {
      this.updateForm(refGeoProvince);

      this.refGeoRegionService
        .query({ filter: 'refgeoprovince-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoRegion[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoRegion[]) => {
          if (!refGeoProvince.region || !refGeoProvince.region.id) {
            this.regions = resBody;
          } else {
            this.refGeoRegionService
              .find(refGeoProvince.region.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoRegion>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoRegion[]) => (this.regions = concatRes));
          }
        });
    });
  }

  updateForm(refGeoProvince: IRefGeoProvince): void {
    this.editForm.patchValue({
      id: refGeoProvince.id,
      provinceName: refGeoProvince.provinceName,
      region: refGeoProvince.region,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoProvince = this.createFromForm();
    if (refGeoProvince.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoProvinceService.update(refGeoProvince));
    } else {
      this.subscribeToSaveResponse(this.refGeoProvinceService.create(refGeoProvince));
    }
  }

  private createFromForm(): IRefGeoProvince {
    return {
      ...new RefGeoProvince(),
      id: this.editForm.get(['id'])!.value,
      provinceName: this.editForm.get(['provinceName'])!.value,
      region: this.editForm.get(['region'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoProvince>>): void {
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

  trackById(index: number, item: IRefGeoRegion): any {
    return item.id;
  }
}
