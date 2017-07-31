import { TestBed, inject } from '@angular/core/testing';

import { ConfigSlotsService } from './config-slots.service';

describe('ConfigSlotsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigSlotsService]
    });
  });

  it('should be created', inject([ConfigSlotsService], (service: ConfigSlotsService) => {
    expect(service).toBeTruthy();
  }));
});
