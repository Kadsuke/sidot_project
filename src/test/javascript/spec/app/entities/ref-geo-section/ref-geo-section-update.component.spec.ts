import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoSectionUpdateComponent } from 'app/entities/ref-geo-section/ref-geo-section-update.component';
import { RefGeoSectionService } from 'app/entities/ref-geo-section/ref-geo-section.service';
import { RefGeoSection } from 'app/shared/model/ref-geo-section.model';

describe('Component Tests', () => {
  describe('RefGeoSection Management Update Component', () => {
    let comp: RefGeoSectionUpdateComponent;
    let fixture: ComponentFixture<RefGeoSectionUpdateComponent>;
    let service: RefGeoSectionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoSectionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RefGeoSectionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoSectionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoSectionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoSection(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoSection();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
