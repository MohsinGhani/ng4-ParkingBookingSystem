import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GulshanParkingComponent } from './gulshan-parking.component';

describe('GulshanParkingComponent', () => {
  let component: GulshanParkingComponent;
  let fixture: ComponentFixture<GulshanParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GulshanParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GulshanParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
