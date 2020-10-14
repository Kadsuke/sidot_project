import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoRegionUpdateComponent } from 'app/entities/ref-geo-region/ref-geo-region-update.component';
import { RefGeoRegionService } from 'app/entities/ref-geo-region/ref-geo-region.service';
import { RefGeoRegion } from 'app/shared/model/ref-geo-region.model';

describe('Component Tests', () => {
  describe('RefGeoRegion Management Update Component', () => {
    let comp: RefGeoRegionUpdateComponent;
    let fixture: ComponentFixture<RefGeoRegionUpdateComponent>;
    let service: RefGeoRegionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoRegionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RefGeoRegionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoRegionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoRegionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoRegion(123);
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
        const entity = new RefGeoRegion();
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
