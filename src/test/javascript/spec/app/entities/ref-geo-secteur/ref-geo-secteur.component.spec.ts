import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { SidotTestModule } from '../../../test.module';
import { RefGeoSecteurComponent } from 'app/entities/ref-geo-secteur/ref-geo-secteur.component';
import { RefGeoSecteurService } from 'app/entities/ref-geo-secteur/ref-geo-secteur.service';
import { RefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';

describe('Component Tests', () => {
  describe('RefGeoSecteur Management Component', () => {
    let comp: RefGeoSecteurComponent;
    let fixture: ComponentFixture<RefGeoSecteurComponent>;
    let service: RefGeoSecteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoSecteurComponent],
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
        .overrideTemplate(RefGeoSecteurComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoSecteurComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoSecteurService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RefGeoSecteur(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.refGeoSecteurs && comp.refGeoSecteurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RefGeoSecteur(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.refGeoSecteurs && comp.refGeoSecteurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
