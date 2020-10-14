import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoSection, RefGeoSection } from 'app/shared/model/ref-geo-section.model';
import { RefGeoSectionService } from './ref-geo-section.service';
import { IRefGeoLot } from 'app/shared/model/ref-geo-lot.model';
import { RefGeoLotService } from 'app/entities/ref-geo-lot/ref-geo-lot.service';

@Component({
  selector: 'jhi-ref-geo-section-update',
  templateUrl: './ref-geo-section-update.component.html',
})
export class RefGeoSectionUpdateComponent implements OnInit {
  isSaving = false;
  lots: IRefGeoLot[] = [];

  editForm = this.fb.group({
    id: [],
    sectionName: [],
    lot: [],
  });

  constructor(
    protected refGeoSectionService: RefGeoSectionService,
    protected refGeoLotService: RefGeoLotService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoSection }) => {
      this.updateForm(refGeoSection);

      this.refGeoLotService
        .query({ filter: 'refgeosection-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoLot[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoLot[]) => {
          if (!refGeoSection.lot || !refGeoSection.lot.id) {
            this.lots = resBody;
          } else {
            this.refGeoLotService
              .find(refGeoSection.lot.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoLot>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoLot[]) => (this.lots = concatRes));
          }
        });
    });
  }

  updateForm(refGeoSection: IRefGeoSection): void {
    this.editForm.patchValue({
      id: refGeoSection.id,
      sectionName: refGeoSection.sectionName,
      lot: refGeoSection.lot,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoSection = this.createFromForm();
    if (refGeoSection.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoSectionService.update(refGeoSection));
    } else {
      this.subscribeToSaveResponse(this.refGeoSectionService.create(refGeoSection));
    }
  }

  private createFromForm(): IRefGeoSection {
    return {
      ...new RefGeoSection(),
      id: this.editForm.get(['id'])!.value,
      sectionName: this.editForm.get(['sectionName'])!.value,
      lot: this.editForm.get(['lot'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoSection>>): void {
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

  trackById(index: number, item: IRefGeoLot): any {
    return item.id;
  }
}
