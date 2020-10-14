import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoSection, RefGeoSection } from 'app/shared/model/ref-geo-section.model';
import { RefGeoSectionService } from './ref-geo-section.service';
import { IRefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';
import { RefGeoSecteurService } from 'app/entities/ref-geo-secteur/ref-geo-secteur.service';

@Component({
  selector: 'jhi-ref-geo-section-update',
  templateUrl: './ref-geo-section-update.component.html',
})
export class RefGeoSectionUpdateComponent implements OnInit {
  isSaving = false;
  secteurs: IRefGeoSecteur[] = [];

  editForm = this.fb.group({
    id: [],
    sectionName: [],
    secteur: [],
  });

  constructor(
    protected refGeoSectionService: RefGeoSectionService,
    protected refGeoSecteurService: RefGeoSecteurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoSection }) => {
      this.updateForm(refGeoSection);

      this.refGeoSecteurService
        .query({ filter: 'refgeosection-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoSecteur[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoSecteur[]) => {
          if (!refGeoSection.secteur || !refGeoSection.secteur.id) {
            this.secteurs = resBody;
          } else {
            this.refGeoSecteurService
              .find(refGeoSection.secteur.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoSecteur>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoSecteur[]) => (this.secteurs = concatRes));
          }
        });
    });
  }

  updateForm(refGeoSection: IRefGeoSection): void {
    this.editForm.patchValue({
      id: refGeoSection.id,
      sectionName: refGeoSection.sectionName,
      secteur: refGeoSection.secteur,
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
      secteur: this.editForm.get(['secteur'])!.value,
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

  trackById(index: number, item: IRefGeoSecteur): any {
    return item.id;
  }
}
