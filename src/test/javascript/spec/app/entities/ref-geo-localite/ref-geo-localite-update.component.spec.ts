import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoLocaliteUpdateComponent } from 'app/entities/ref-geo-localite/ref-geo-localite-update.component';
import { RefGeoLocaliteService } from 'app/entities/ref-geo-localite/ref-geo-localite.service';
import { RefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';

describe('Component Tests', () => {
  describe('RefGeoLocalite Management Update Component', () => {
    let comp: RefGeoLocaliteUpdateComponent;
    let fixture: ComponentFixture<RefGeoLocaliteUpdateComponent>;
    let service: RefGeoLocaliteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoLocaliteUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RefGeoLocaliteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoLocaliteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoLocaliteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoLocalite(123);
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
        const entity = new RefGeoLocalite();
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
