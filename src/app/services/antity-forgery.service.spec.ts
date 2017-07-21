import { TestBed, inject } from '@angular/core/testing';

import { AntityForgeryService } from './antity-forgery.service';

describe('AntityForgeryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AntityForgeryService]
    });
  });

  it('should be created', inject([AntityForgeryService], (service: AntityForgeryService) => {
    expect(service).toBeTruthy();
  }));
});
