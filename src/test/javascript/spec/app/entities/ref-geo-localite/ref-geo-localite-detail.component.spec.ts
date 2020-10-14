import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoLocaliteDetailComponent } from 'app/entities/ref-geo-localite/ref-geo-localite-detail.component';
import { RefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';

describe('Component Tests', () => {
  describe('RefGeoLocalite Management Detail Component', () => {
    let comp: RefGeoLocaliteDetailComponent;
    let fixture: ComponentFixture<RefGeoLocaliteDetailComponent>;
    const route = ({ data: of({ refGeoLocalite: new RefGeoLocalite(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoLocaliteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RefGeoLocaliteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefGeoLocaliteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load refGeoLocalite on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refGeoLocalite).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
