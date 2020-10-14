import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoProvince, RefGeoProvince } from 'app/shared/model/ref-geo-province.model';
import { RefGeoProvinceService } from './ref-geo-province.service';
import { IRefGeoCommune } from 'app/shared/model/ref-geo-commune.model';
import { RefGeoCommuneService } from 'app/entities/ref-geo-commune/ref-geo-commune.service';

@Component({
  selector: 'jhi-ref-geo-province-update',
  templateUrl: './ref-geo-province-update.component.html',
})
export class RefGeoProvinceUpdateComponent implements OnInit {
  isSaving = false;
  communes: IRefGeoCommune[] = [];

  editForm = this.fb.group({
    id: [],
    provinceName: [],
    commune: [],
  });

  constructor(
    protected refGeoProvinceService: RefGeoProvinceService,
    protected refGeoCommuneService: RefGeoCommuneService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoProvince }) => {
      this.updateForm(refGeoProvince);

      this.refGeoCommuneService
        .query({ filter: 'refgeoprovince-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoCommune[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoCommune[]) => {
          if (!refGeoProvince.commune || !refGeoProvince.commune.id) {
            this.communes = resBody;
          } else {
            this.refGeoCommuneService
              .find(refGeoProvince.commune.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoCommune>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoCommune[]) => (this.communes = concatRes));
          }
        });
    });
  }

  updateForm(refGeoProvince: IRefGeoProvince): void {
    this.editForm.patchValue({
      id: refGeoProvince.id,
      provinceName: refGeoProvince.provinceName,
      commune: refGeoProvince.commune,
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
      commune: this.editForm.get(['commune'])!.value,
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

  trackById(index: number, item: IRefGeoCommune): any {
    return item.id;
  }
}
