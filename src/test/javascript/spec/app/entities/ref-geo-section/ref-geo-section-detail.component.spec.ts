import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoSectionDetailComponent } from 'app/entities/ref-geo-section/ref-geo-section-detail.component';
import { RefGeoSection } from 'app/shared/model/ref-geo-section.model';

describe('Component Tests', () => {
  describe('RefGeoSection Management Detail Component', () => {
    let comp: RefGeoSectionDetailComponent;
    let fixture: ComponentFixture<RefGeoSectionDetailComponent>;
    const route = ({ data: of({ refGeoSection: new RefGeoSection(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoSectionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RefGeoSectionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefGeoSectionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load refGeoSection on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refGeoSection).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
