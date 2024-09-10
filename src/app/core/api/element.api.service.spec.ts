import { TestBed } from '@angular/core/testing';

import { ElementApiService } from './element.api.service';

describe('ElementApiService', () => {
  let service: ElementApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
