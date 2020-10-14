import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoLot, RefGeoLot } from 'app/shared/model/ref-geo-lot.model';
import { RefGeoLotService } from './ref-geo-lot.service';
import { IRefGeoSection } from 'app/shared/model/ref-geo-section.model';
import { RefGeoSectionService } from 'app/entities/ref-geo-section/ref-geo-section.service';

@Component({
  selector: 'jhi-ref-geo-lot-update',
  templateUrl: './ref-geo-lot-update.component.html',
})
export class RefGeoLotUpdateComponent implements OnInit {
  isSaving = false;
  sections: IRefGeoSection[] = [];

  editForm = this.fb.group({
    id: [],
    lotName: [],
    section: [],
  });

  constructor(
    protected refGeoLotService: RefGeoLotService,
    protected refGeoSectionService: RefGeoSectionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoLot }) => {
      this.updateForm(refGeoLot);

      this.refGeoSectionService
        .query({ filter: 'refgeolot-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoSection[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoSection[]) => {
          if (!refGeoLot.section || !refGeoLot.section.id) {
            this.sections = resBody;
          } else {
            this.refGeoSectionService
              .find(refGeoLot.section.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoSection>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoSection[]) => (this.sections = concatRes));
          }
        });
    });
  }

  updateForm(refGeoLot: IRefGeoLot): void {
    this.editForm.patchValue({
      id: refGeoLot.id,
      lotName: refGeoLot.lotName,
      section: refGeoLot.section,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoLot = this.createFromForm();
    if (refGeoLot.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoLotService.update(refGeoLot));
    } else {
      this.subscribeToSaveResponse(this.refGeoLotService.create(refGeoLot));
    }
  }

  private createFromForm(): IRefGeoLot {
    return {
      ...new RefGeoLot(),
      id: this.editForm.get(['id'])!.value,
      lotName: this.editForm.get(['lotName'])!.value,
      section: this.editForm.get(['section'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoLot>>): void {
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

  trackById(index: number, item: IRefGeoSection): any {
    return item.id;
  }
}
