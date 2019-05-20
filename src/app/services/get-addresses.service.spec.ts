import { TestBed } from '@angular/core/testing';

import { GetAddressesService } from './get-addresses.service';

describe('GetAddressesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAddressesService = TestBed.get(GetAddressesService);
    expect(service).toBeTruthy();
  });
});
