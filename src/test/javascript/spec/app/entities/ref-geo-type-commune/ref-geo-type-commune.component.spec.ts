import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { SidotTestModule } from '../../../test.module';
import { RefGeoTypeCommuneComponent } from 'app/entities/ref-geo-type-commune/ref-geo-type-commune.component';
import { RefGeoTypeCommuneService } from 'app/entities/ref-geo-type-commune/ref-geo-type-commune.service';
import { RefGeoTypeCommune } from 'app/shared/model/ref-geo-type-commune.model';

describe('Component Tests', () => {
  describe('RefGeoTypeCommune Management Component', () => {
    let comp: RefGeoTypeCommuneComponent;
    let fixture: ComponentFixture<RefGeoTypeCommuneComponent>;
    let service: RefGeoTypeCommuneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoTypeCommuneComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(RefGeoTypeCommuneComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoTypeCommuneComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoTypeCommuneService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RefGeoTypeCommune(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.refGeoTypeCommunes && comp.refGeoTypeCommunes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RefGeoTypeCommune(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.refGeoTypeCommunes && comp.refGeoTypeCommunes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
