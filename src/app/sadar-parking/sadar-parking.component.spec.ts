import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadarParkingComponent } from './sadar-parking.component';

describe('SadarParkingComponent', () => {
  let component: SadarParkingComponent;
  let fixture: ComponentFixture<SadarParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadarParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadarParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
