import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRefGeoParcelle, RefGeoParcelle } from 'app/shared/model/ref-geo-parcelle.model';
import { RefGeoParcelleService } from './ref-geo-parcelle.service';

@Component({
  selector: 'jhi-ref-geo-parcelle-update',
  templateUrl: './ref-geo-parcelle-update.component.html',
})
export class RefGeoParcelleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    parcelleName: [],
  });

  constructor(protected refGeoParcelleService: RefGeoParcelleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoParcelle }) => {
      this.updateForm(refGeoParcelle);
    });
  }

  updateForm(refGeoParcelle: IRefGeoParcelle): void {
    this.editForm.patchValue({
      id: refGeoParcelle.id,
      parcelleName: refGeoParcelle.parcelleName,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoParcelle = this.createFromForm();
    if (refGeoParcelle.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoParcelleService.update(refGeoParcelle));
    } else {
      this.subscribeToSaveResponse(this.refGeoParcelleService.create(refGeoParcelle));
    }
  }

  private createFromForm(): IRefGeoParcelle {
    return {
      ...new RefGeoParcelle(),
      id: this.editForm.get(['id'])!.value,
      parcelleName: this.editForm.get(['parcelleName'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoParcelle>>): void {
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
