import { TestBed } from '@angular/core/testing';

import { CategorieshouseService } from './categorieshouse.service';

describe('CategorieshouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategorieshouseService = TestBed.get(CategorieshouseService);
    expect(service).toBeTruthy();
  });
});
