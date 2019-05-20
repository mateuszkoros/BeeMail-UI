import { TestBed } from '@angular/core/testing';

import { DeleteMailService } from './delete-mail.service';

describe('DeleteMailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteMailService = TestBed.get(DeleteMailService);
    expect(service).toBeTruthy();
  });
});
