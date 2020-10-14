import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoSecteurDetailComponent } from 'app/entities/ref-geo-secteur/ref-geo-secteur-detail.component';
import { RefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';

describe('Component Tests', () => {
  describe('RefGeoSecteur Management Detail Component', () => {
    let comp: RefGeoSecteurDetailComponent;
    let fixture: ComponentFixture<RefGeoSecteurDetailComponent>;
    const route = ({ data: of({ refGeoSecteur: new RefGeoSecteur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoSecteurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RefGeoSecteurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefGeoSecteurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load refGeoSecteur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refGeoSecteur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
