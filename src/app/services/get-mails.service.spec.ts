import { TestBed } from '@angular/core/testing';

import { GetMailsService } from './get-mails.service';

describe('GetMailsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: GetMailsService = TestBed.get(GetMailsService);
        expect(service).toBeTruthy();
    });
});
