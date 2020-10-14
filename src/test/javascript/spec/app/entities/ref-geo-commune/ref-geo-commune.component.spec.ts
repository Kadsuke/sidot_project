import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { SidotTestModule } from '../../../test.module';
import { RefGeoCommuneComponent } from 'app/entities/ref-geo-commune/ref-geo-commune.component';
import { RefGeoCommuneService } from 'app/entities/ref-geo-commune/ref-geo-commune.service';
import { RefGeoCommune } from 'app/shared/model/ref-geo-commune.model';

describe('Component Tests', () => {
  describe('RefGeoCommune Management Component', () => {
    let comp: RefGeoCommuneComponent;
    let fixture: ComponentFixture<RefGeoCommuneComponent>;
    let service: RefGeoCommuneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoCommuneComponent],
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
        .overrideTemplate(RefGeoCommuneComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoCommuneComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoCommuneService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RefGeoCommune(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.refGeoCommunes && comp.refGeoCommunes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RefGeoCommune(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.refGeoCommunes && comp.refGeoCommunes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
