import { TestBed } from '@angular/core/testing';

import { ElementEditService } from './element-edit.service';

describe('ElementEditService', () => {
  let service: ElementEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
