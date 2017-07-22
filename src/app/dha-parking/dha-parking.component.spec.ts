import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhaParkingComponent } from './dha-parking.component';

describe('DhaParkingComponent', () => {
  let component: DhaParkingComponent;
  let fixture: ComponentFixture<DhaParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhaParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhaParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
