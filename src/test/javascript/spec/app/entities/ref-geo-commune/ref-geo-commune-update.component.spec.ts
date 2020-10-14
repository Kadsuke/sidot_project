import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoCommuneUpdateComponent } from 'app/entities/ref-geo-commune/ref-geo-commune-update.component';
import { RefGeoCommuneService } from 'app/entities/ref-geo-commune/ref-geo-commune.service';
import { RefGeoCommune } from 'app/shared/model/ref-geo-commune.model';

describe('Component Tests', () => {
  describe('RefGeoCommune Management Update Component', () => {
    let comp: RefGeoCommuneUpdateComponent;
    let fixture: ComponentFixture<RefGeoCommuneUpdateComponent>;
    let service: RefGeoCommuneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoCommuneUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RefGeoCommuneUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoCommuneUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoCommuneService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoCommune(123);
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
        const entity = new RefGeoCommune();
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
