import { TestBed } from '@angular/core/testing';

import { ElementFilterService } from './element-filter.service';

describe('ElementFilterService', () => {
  let service: ElementFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
