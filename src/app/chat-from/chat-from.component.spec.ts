import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFromComponent } from './chat-from.component';

describe('ChatFromComponent', () => {
  let component: ChatFromComponent;
  let fixture: ComponentFixture<ChatFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
