import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoSecteur, RefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';
import { RefGeoSecteurService } from './ref-geo-secteur.service';
import { IRefGeoSection } from 'app/shared/model/ref-geo-section.model';
import { RefGeoSectionService } from 'app/entities/ref-geo-section/ref-geo-section.service';

@Component({
  selector: 'jhi-ref-geo-secteur-update',
  templateUrl: './ref-geo-secteur-update.component.html',
})
export class RefGeoSecteurUpdateComponent implements OnInit {
  isSaving = false;
  sections: IRefGeoSection[] = [];

  editForm = this.fb.group({
    id: [],
    secteurName: [],
    section: [],
  });

  constructor(
    protected refGeoSecteurService: RefGeoSecteurService,
    protected refGeoSectionService: RefGeoSectionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoSecteur }) => {
      this.updateForm(refGeoSecteur);

      this.refGeoSectionService
        .query({ filter: 'refgeosecteur-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoSection[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoSection[]) => {
          if (!refGeoSecteur.section || !refGeoSecteur.section.id) {
            this.sections = resBody;
          } else {
            this.refGeoSectionService
              .find(refGeoSecteur.section.id)
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

  updateForm(refGeoSecteur: IRefGeoSecteur): void {
    this.editForm.patchValue({
      id: refGeoSecteur.id,
      secteurName: refGeoSecteur.secteurName,
      section: refGeoSecteur.section,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoSecteur = this.createFromForm();
    if (refGeoSecteur.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoSecteurService.update(refGeoSecteur));
    } else {
      this.subscribeToSaveResponse(this.refGeoSecteurService.create(refGeoSecteur));
    }
  }

  private createFromForm(): IRefGeoSecteur {
    return {
      ...new RefGeoSecteur(),
      id: this.editForm.get(['id'])!.value,
      secteurName: this.editForm.get(['secteurName'])!.value,
      section: this.editForm.get(['section'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoSecteur>>): void {
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
