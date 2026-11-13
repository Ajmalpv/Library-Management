import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailabilityReport } from './availability-report';

describe('AvailabilityReport', () => {
  let component: AvailabilityReport;
  let fixture: ComponentFixture<AvailabilityReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityReport],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailabilityReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
