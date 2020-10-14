import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRefGeoRegion, RefGeoRegion } from 'app/shared/model/ref-geo-region.model';
import { RefGeoRegionService } from './ref-geo-region.service';

@Component({
  selector: 'jhi-ref-geo-region-update',
  templateUrl: './ref-geo-region-update.component.html',
})
export class RefGeoRegionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    regionName: [],
  });

  constructor(protected refGeoRegionService: RefGeoRegionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoRegion }) => {
      this.updateForm(refGeoRegion);
    });
  }

  updateForm(refGeoRegion: IRefGeoRegion): void {
    this.editForm.patchValue({
      id: refGeoRegion.id,
      regionName: refGeoRegion.regionName,
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
}
