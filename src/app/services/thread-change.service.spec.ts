import { TestBed } from '@angular/core/testing';

import { ThreadChangeService } from './thread-change.service';

describe('ThreadChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThreadChangeService = TestBed.get(ThreadChangeService);
    expect(service).toBeTruthy();
  });
});
