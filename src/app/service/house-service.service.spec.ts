import { TestBed } from '@angular/core/testing';

// @ts-ignore
import { HouseServiceService } from './house-service.service';

describe('HouseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HouseServiceService = TestBed.get(HouseServiceService);
    expect(service).toBeTruthy();
  });
});
