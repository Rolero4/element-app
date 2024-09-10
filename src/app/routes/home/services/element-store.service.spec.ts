import { TestBed } from '@angular/core/testing';

import { ElementStoreService } from './element-store.service';

describe('ElementStoreService', () => {
  let service: ElementStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
